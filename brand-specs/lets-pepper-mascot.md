# Let's Pepper Mascot Brand Specification

> Reusable specification for generating consistent Let's Pepper mascot artwork across all formats (web, print, clothing, stickers).

---

## Brand Overview

**Brand**: Let's Pepper
**Website**: letspepper.com
**Industry**: Grass Volleyball Tournaments
**Tone**: Playful, athletic, community-driven, grassroots, anti-corporate

---

## CRITICAL: Face Requirements

**Every mascot MUST have a full expressive cartoon face. This is non-negotiable.**

```
REQUIRED FACIAL FEATURES:
├── TWO LARGE EYES
│   ├── Cream/white sclera (eye whites)
│   ├── Black pupils
│   └── Visible, expressive
├── EXPRESSIVE EYEBROWS
│   ├── Above the eyes
│   ├── Show emotion (excited, determined, happy)
│   └── NOT angry V-shape (unless Ghost Pepper)
├── WIDE OPEN MOUTH
│   ├── Showing smile/enthusiasm
│   ├── Red tongue often visible
│   └── Conveys energy and friendliness
└── PLACEMENT
    └── Face is ON the front of the pepper body
```

**NEVER generate a faceless pepper. If the model produces a pepper without clear eyes, eyebrows, and mouth - regenerate.**

---

## Mascot System

Let's Pepper uses different pepper varieties to represent event "flavors" (tournament types), plus color variants of the bell pepper for general branding.

### Event Flavor Mascots (Pepper Varieties)

| Pepper Type | Shape | Color | Event Type | Personality |
|-------------|-------|-------|------------|-------------|
| **Bell Pepper** | Round, bulbous, lobed bottom | Yellow/Green/Red/Orange | Entry-level "Open" events | Sweet, welcoming, accessible |
| **Jalapeño** | Elongated, tapered, pointed tip | Bright green `#4CAF50` | Mid-tier intensity | Spicy, technical, fast-paced |
| **Poblano** | Wide top, long taper, textured | Dark green `#1B5E20` | Defensive-focused | Gritty, grinder, relentless |
| **Banana Pepper** | Long curved crescent | Pale yellow `#FFEB3B` | Series progression | Playful, unpredictable |
| **Ghost Pepper** | Wrinkled, gnarly, intimidating | Red-orange `#E64A19` | Elite invite-only | Intense, elite, intimidating |

### Quiz Personality Mascots

These peppers are used as personality quiz results on the website (/quiz). They share the mascot art style but represent player personality types rather than event tiers.

| Pepper Type | Shape | Color | Quiz Personality | Tagline |
|-------------|-------|-------|------------------|---------|
| **Bell Pepper** | (same as Event Flavor) | (same) | Here for the vibes | Team player, community builder |
| **Serrano** | Slim, elongated, sleek, pointed tip | Deep green `#2E7D32` | Sneaky dangerous | Quiet confidence, clutch performer |
| **Chipotle** | Dried/wrinkled jalapeño, smoky texture | Brown-red `#8B4513` | Smooth veteran | Experienced, composed, leader |
| **Habanero** | Round, lantern-shaped, bumpy | Bright orange `#FF6D00` | Intense competitor | Passionate, competitive, motivator |
| **Carolina Reaper** | Gnarly, bumpy, scorpion-tail tip | Intense red `#C62828` | Unhinged energy | Relentless, fearless, unstoppable |
| **Pepper X** | Alien, extreme gnarly, otherworldly | Electric fuchsia `#D946EF` | Beyond the Scoville scale | Chaotic energy, sky ball specialist (easter egg) |

### Award Category Mascots

These peppers represent the 5 Pepper Awards voting categories (/awards).

| Award | Pepper | Heat Level | Category |
|-------|--------|------------|----------|
| **Ghost Pepper Award** | Ghost Pepper | Habanero | MVP |
| **Jalapeño Award** | Jalapeño | Jalapeno | Most Improved |
| **Habanero Award** | Habanero | Habanero | Best Single Performance |
| **Chipotle Award** | Chipotle | Poblano | Best Sportsmanship |
| **Bell Pepper Award** | Bell Pepper | Bell | Most Fun Team |

### Bell Pepper Color Variants

| Variant | Hex Colors | Personality | Distinguishing Feature |
|---------|------------|-------------|------------------------|
| **Yellow (Primary)** | Body: `#F5B91A`, Accents: `#4A7C3F` | Energetic leader, main mascot | Standard design |
| **Green** | Body: `#4A7C3F`, Accents: `#F5B91A` | Earthy, grounded, defensive | Slightly calmer expression |
| **Red** | Body: `#D94C35`, Accents: `#4A7C3F` | Smart, strategic player | **Black-framed glasses** |
| **Orange** | Body: `#FF8C00`, Accents: `#4A7C3F` | Warm, energetic | Vibrant enthusiasm |

---

## Visual Style Guide

### Body Proportions

```
CRITICAL: Athletic but NOT bodybuilder

- Head-to-body ratio: ~1:2
- Limbs: Cylindrical, simple shapes
- Muscle definition: Minimal, implied only
- No visible muscle fibers or veins
- Arms/legs same thickness as yellow variant reference
```

### Anatomy Reference

```
HEAD
- Bell pepper shape with natural lobes
- Single green stem at top (curved, organic)
- Large expressive eyes (cream/beige sclera, dark pupils)
- Open mouth smile showing red tongue
- Eyebrows: Energized but NOT angry (45° max angle)

BODY
- Smooth transition from head (no neck)
- Torso tapers slightly toward waist
- Simple anatomical suggestion, not detailed

LIMBS
- Arms: Simple cylindrical, elbow bend
- Hands: Cartoon glove style, 4 fingers
- Legs: Athletic, running pose typical
- Feet: Green sneakers with light soles
```

### Outfit

```
ALL VARIANTS:
- Shorts: Dark green (#3D5A3D) or black (#1A1A1A)
- Shoes: Green sneakers (#4A7C3F) with cream/white soles
- No wristbands
- No headbands
- No additional accessories

EXCEPTION:
- Red variant ONLY: Black-framed glasses
```

### Volleyball Design

```
ALWAYS:
- Green and cream/beige stripes
- Represents grass volleyball identity
- 6-panel design visible

NEVER:
- Plain white/beige ball
- Indoor volleyball appearance
- Brand logos on ball
```

### Expression

```
TARGET EMOTION: "Let's go!" not "I'll destroy you"

- Open-mouth smile (shows enthusiasm)
- Confident smirk (shows skill)
- Eyebrows raised or slightly angled (energy)
- Eyes looking toward action/ball

AVOID:
- Aggressive scowl
- Angry eyebrows (steep V-shape)
- Intimidating expressions
- Closed-mouth serious face
```

### Line Work

```
- Bold dark outlines (#1A1A1A)
- Consistent weight throughout
- Minimal interior detail lines
- Clean vector but not sterile
- Slight hand-drawn energy acceptable
```

---

## Color Palette

### Primary Colors

| Name | Hex | Usage |
|------|-----|-------|
| Pepper Yellow | `#F5B91A` | Yellow mascot body, highlights |
| Pepper Green | `#4A7C3F` | Green mascot body, all variant accents |
| Pepper Red | `#D94C35` | Red mascot body |
| Deep Green | `#3D5A3D` | Shorts, darker accents |
| Cream | `#F5F5DC` | Volleyball stripes, eye whites |

### Supporting Colors

| Name | Hex | Usage |
|------|-----|-------|
| Outline Black | `#1A1A1A` | All outlines |
| Tongue Red | `#C41E3A` | Open mouth interior |
| Shoe Sole | `#E8E4D9` | Sneaker soles |
| Grass Accent | `#7CB342` | Optional grass elements |

---

## Pose Library

### Recommended Action Poses

1. **Spike/Attack** - Jumping with arm raised, ball above
2. **Dig/Dive** - Horizontal flying position, arms extended
3. **Set** - Arms up, fingers positioned for set
4. **Serve** - One arm back, ball toss position
5. **Celebration** - Both fists raised, victorious
6. **Running** - Dynamic sprint with ball
7. **Ready Position** - Athletic stance, arms out

### Standing/Static Poses

1. **Thumbs Up** - Friendly approval
2. **Ball Spin** - Spinning ball on finger
3. **Arms Crossed** - Confident stance
4. **Wave** - Welcoming gesture

---

## Format-Specific Guidelines

### Web Usage

- Full color with subtle drop shadow
- Works as hero graphic or accent
- Transparent PNG or SVG preferred
- Minimum size: 200px height

### Print (Posters, Banners)

- CMYK color conversion required
- 300 DPI minimum
- Test small-scale readability
- Include bleed area for full-bleed prints

### Clothing/Apparel

- Create 2-3 color simplified version
- Test on black AND white fabric
- Remove fine detail for screen printing
- Bold outlines essential

### Stickers/Die-Cut

- Add 2-4px white outline/border
- Simplified detail for small sizes
- Die-cut friendly silhouette
- Test at 2" size minimum

### Favicon/Icon

- Use yellow mascot as primary
- Extreme simplification required
- Head-only version acceptable
- Test at 16x16, 32x32, 64x64

---

## What NOT to Do

### Body Style

- NO bodybuilder/hyper-muscular proportions
- NO visible muscle fibers or anatomical detail
- NO intimidating hulk-like appearance
- NO generic esports mascot aesthetic

### Outfit

- NO brown shorts or accessories
- NO wristbands or headbands (except red's glasses)
- NO boots (always sneakers)
- NO indoor volleyball gear

### Expression

- NO angry scowl
- NO aggressive snarl
- NO intimidating glare
- NO closed-mouth serious face

### Volleyball

- NO plain white/beige volleyball
- NO indoor volleyball design
- NO branded balls

---

## File Naming Convention

```
lets-pepper-{color}-{pose}-{format}.{ext}

Examples:
lets-pepper-yellow-spike-web.png
lets-pepper-green-dig-print.png
lets-pepper-red-serve-sticker.png
lets-pepper-yellow-celebration-tshirt-dark.svg
```

---

## Quality Checklist

Before finalizing any mascot artwork, verify:

- [ ] Body proportions match yellow reference (not bodybuilder)
- [ ] Outfit is green/black shorts + green sneakers
- [ ] Volleyball has green/cream stripes
- [ ] Expression is confident-fun (not aggressive)
- [ ] Line weight is consistent and bold
- [ ] Colors match brand palette
- [ ] Red variant has glasses (if applicable)
- [ ] No unapproved accessories
- [ ] Tested at target format size

---

## Reference Images

Located in: `/Users/nino/Downloads/`

| File | Description | Use As |
|------|-------------|--------|
| `Let's Pepper-23-mascot-yellow.png` | Yellow mascot spike pose | **PRIMARY REFERENCE** |
| `Let's Pepper-19-tee-front-yellow.png` | Yellow with logo lockup | Logo composition reference |
| `Let's Pepper-35-fav.ico.png` | Green simplified versions | Icon/simplified reference |
| `Let's Pepper-21-mascot-green.png` | Green diving pose | Style to AVOID (too muscular) |
| `Let's Pepper-22-mascot-red.png` | Red with glasses | Needs style correction |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-23 | Initial specification |

---

*This specification should be referenced for all future Let's Pepper mascot generation to ensure brand consistency.*
