/**
 * Progress Tracking Utilities
 * Persistent progress tracking for batch operations
 */

import fs from 'fs';
import path from 'path';

/**
 * Progress tracker for batch operations
 */
export class ProgressTracker {
  constructor(filePath) {
    this.filePath = filePath;
    this.data = this.load();
  }

  /**
   * Load progress from file
   * @returns {object}
   */
  load() {
    if (fs.existsSync(this.filePath)) {
      try {
        return JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
      } catch {
        return this.getEmptyState();
      }
    }
    return this.getEmptyState();
  }

  /**
   * Get empty progress state
   * @returns {object}
   */
  getEmptyState() {
    return {
      completed: [],
      failed: [],
      skipped: [],
      metadata: {},
    };
  }

  /**
   * Save progress to file
   */
  save() {
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
  }

  /**
   * Mark an item as completed
   * @param {string} id
   * @param {object} metadata - Optional metadata to store
   */
  markCompleted(id, metadata) {
    if (!this.data.completed.includes(id)) {
      this.data.completed.push(id);
    }
    // Remove from failed if present
    this.data.failed = this.data.failed.filter((f) => f !== id);
    if (metadata) {
      this.data.metadata[id] = metadata;
    }
    this.save();
  }

  /**
   * Mark an item as failed
   * @param {string} id
   * @param {string} error - Error message
   */
  markFailed(id, error) {
    if (!this.data.failed.includes(id)) {
      this.data.failed.push(id);
    }
    this.data.metadata[id] = { error, failedAt: new Date().toISOString() };
    this.save();
  }

  /**
   * Mark an item as skipped
   * @param {string} id
   * @param {string} reason
   */
  markSkipped(id, reason) {
    if (!this.data.skipped.includes(id)) {
      this.data.skipped.push(id);
    }
    this.data.metadata[id] = { skippedReason: reason };
    this.save();
  }

  /**
   * Check if an item is completed
   * @param {string} id
   * @returns {boolean}
   */
  isCompleted(id) {
    return this.data.completed.includes(id);
  }

  /**
   * Check if an item should be processed
   * @param {string} id
   * @returns {boolean}
   */
  shouldProcess(id) {
    return !this.data.completed.includes(id) && !this.data.skipped.includes(id);
  }

  /**
   * Get remaining items from a list
   * @param {string[]} allItems
   * @returns {string[]}
   */
  getRemaining(allItems) {
    return allItems.filter((id) => this.shouldProcess(id));
  }

  /**
   * Get statistics
   * @returns {object}
   */
  getStats() {
    return {
      completed: this.data.completed.length,
      failed: this.data.failed.length,
      skipped: this.data.skipped.length,
    };
  }

  /**
   * Reset progress
   */
  reset() {
    this.data = this.getEmptyState();
    this.save();
  }

  /**
   * Reset only failed items (allow retry)
   */
  resetFailed() {
    this.data.failed = [];
    this.save();
  }
}
