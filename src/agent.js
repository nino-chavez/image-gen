/**
 * Image Generation Agent
 * AI-driven image generation with intelligent decision making
 *
 * This agent can:
 * - Analyze content and determine optimal visual style
 * - Generate contextually appropriate images
 * - Handle batch operations with smart prioritization
 * - Provide recommendations for style improvements
 */

import { createGenerator } from './generator.js';
import { listStyleSystems, getStyleSystem, getStyleForCategory } from './styles/index.js';

/**
 * Image Generation Agent
 * Wraps the generator with intelligent decision-making capabilities
 */
export class ImageAgent {
  constructor(options = {}) {
    this.options = options;
    this.generator = null;
    this.context = {
      generatedImages: [],
      styleHistory: {},
      performanceMetrics: {
        totalGenerated: 0,
        totalFailed: 0,
        avgSizeKB: 0,
        avgGenerationTimeMs: 0,
      },
    };
  }

  /**
   * Initialize the agent
   */
  async init() {
    this.generator = await createGenerator(this.options);
    return this;
  }

  /**
   * Analyze content and recommend a style
   * @param {object} content
   * @returns {object} Style recommendation
   */
  analyzeContent(content) {
    const { title, excerpt, category } = content;
    const text = `${title} ${excerpt || ''}`.toLowerCase();

    // Score each style system
    const scores = {};

    for (const systemName of listStyleSystems()) {
      const system = getStyleSystem(systemName);
      let score = 0;

      // Check concept map matches
      for (const keyword of Object.keys(system.conceptMap || {})) {
        if (text.includes(keyword)) {
          score += 10;
        }
      }

      // Check category matches
      for (const cat of Object.keys(system.styles)) {
        if (category?.toLowerCase().includes(cat.toLowerCase())) {
          score += 20;
        }
      }

      scores[systemName] = score;
    }

    // Find best match
    const bestSystem = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])[0];

    const system = getStyleSystem(bestSystem[0]);
    const style = getStyleForCategory(system, category);

    return {
      recommendedSystem: bestSystem[0],
      score: bestSystem[1],
      style,
      reasoning: this.explainStyleChoice(content, bestSystem[0], style),
    };
  }

  /**
   * Generate explanation for style choice
   */
  explainStyleChoice(content, systemName, style) {
    const reasons = [];

    if (content.category) {
      reasons.push(`Category "${content.category}" maps to ${style.personality || 'this visual style'}`);
    }

    if (systemName === 'illustration') {
      reasons.push('Hand-drawn illustration style provides distinctive visual identity');
    }

    reasons.push(`Color palette: ${style.lineColor}`);
    reasons.push(`Visual elements: ${style.elements}`);

    return reasons;
  }

  /**
   * Generate an image with smart defaults
   * @param {object} content
   * @param {string} outputPath
   * @returns {Promise<object>}
   */
  async generate(content, outputPath) {
    const startTime = Date.now();

    // Analyze and potentially adjust style
    const analysis = this.analyzeContent(content);

    // Use recommended style system if significantly better
    if (analysis.score > 15 && analysis.recommendedSystem !== this.options.styleSystem) {
      this.generator.styleSystem = getStyleSystem(analysis.recommendedSystem);
    }

    try {
      const result = await this.generator.generateFromContent(content, outputPath);

      // Update metrics
      const generationTime = Date.now() - startTime;
      this.updateMetrics(result, generationTime);

      // Store context
      this.context.generatedImages.push({
        content,
        result,
        analysis,
        generationTime,
        timestamp: new Date().toISOString(),
      });

      return {
        ...result,
        analysis,
        generationTimeMs: generationTime,
      };
    } catch (error) {
      this.context.performanceMetrics.totalFailed++;
      throw error;
    }
  }

  /**
   * Update performance metrics
   */
  updateMetrics(result, generationTime) {
    const m = this.context.performanceMetrics;
    m.totalGenerated++;

    // Rolling average for size
    m.avgSizeKB = Math.round(
      (m.avgSizeKB * (m.totalGenerated - 1) + (result.sizeKB || 0)) / m.totalGenerated
    );

    // Rolling average for time
    m.avgGenerationTimeMs = Math.round(
      (m.avgGenerationTimeMs * (m.totalGenerated - 1) + generationTime) / m.totalGenerated
    );
  }

  /**
   * Generate batch with intelligent ordering
   * @param {Array<object>} items
   * @param {function} getOutputPath
   * @param {object} callbacks
   */
  async generateBatch(items, getOutputPath, callbacks = {}) {
    // Prioritize items by category diversity
    const sortedItems = this.prioritizeItems(items);

    return this.generator.generateBatch(sortedItems, getOutputPath, {
      ...callbacks,
      onProgress: (progress) => {
        // Add analysis to progress
        const analysis = this.analyzeContent(progress.item);
        progress.analysis = analysis;

        if (callbacks.onProgress) {
          callbacks.onProgress(progress);
        }
      },
    });
  }

  /**
   * Prioritize items for batch generation
   * Ensures variety by interleaving categories
   */
  prioritizeItems(items) {
    // Group by category
    const byCategory = {};
    for (const item of items) {
      const cat = item.category || 'default';
      if (!byCategory[cat]) byCategory[cat] = [];
      byCategory[cat].push(item);
    }

    // Interleave
    const result = [];
    const categories = Object.keys(byCategory);
    let hasMore = true;

    while (hasMore) {
      hasMore = false;
      for (const cat of categories) {
        if (byCategory[cat].length > 0) {
          result.push(byCategory[cat].shift());
          hasMore = true;
        }
      }
    }

    return result;
  }

  /**
   * Get generation statistics
   */
  getStats() {
    return {
      ...this.context.performanceMetrics,
      recentGenerations: this.context.generatedImages.slice(-10).map((g) => ({
        title: g.content.title,
        category: g.content.category,
        sizeKB: g.result.sizeKB,
        style: g.analysis.recommendedSystem,
      })),
    };
  }

  /**
   * Get style recommendations for a content set
   * @param {Array<object>} items
   */
  getStyleRecommendations(items) {
    const recommendations = [];

    // Analyze category distribution
    const categories = {};
    for (const item of items) {
      const cat = item.category || 'uncategorized';
      categories[cat] = (categories[cat] || 0) + 1;
    }

    // Check for missing style mappings
    for (const [category, count] of Object.entries(categories)) {
      const system = getStyleSystem(this.options.styleSystem || 'illustration');
      const hasDirectMapping = Object.keys(system.styles).some(
        (k) => k.toLowerCase() === category.toLowerCase()
      );

      if (!hasDirectMapping && count > 3) {
        recommendations.push({
          type: 'missing_style',
          category,
          count,
          suggestion: `Consider adding a dedicated style for "${category}" (${count} items)`,
        });
      }
    }

    // Check for concept map gaps
    const unmatchedTitles = items.filter((item) => {
      const system = getStyleSystem(this.options.styleSystem || 'illustration');
      const titleLower = item.title.toLowerCase();
      return !Object.keys(system.conceptMap || {}).some((k) =>
        titleLower.includes(k)
      );
    });

    if (unmatchedTitles.length > items.length * 0.3) {
      recommendations.push({
        type: 'concept_gaps',
        count: unmatchedTitles.length,
        examples: unmatchedTitles.slice(0, 3).map((i) => i.title),
        suggestion: 'Many titles don\'t match concept keywords. Consider expanding the concept map.',
      });
    }

    return recommendations;
  }
}

/**
 * Create and initialize an image agent
 * @param {object} options
 * @returns {Promise<ImageAgent>}
 */
export async function createAgent(options) {
  const agent = new ImageAgent(options);
  await agent.init();
  return agent;
}
