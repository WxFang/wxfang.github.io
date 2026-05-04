# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Echo Garden — a Godot 4.6 peaceful plant-growing game. Players tend a 6×6 grid of cells, watering seeds through growth stages and discovering special seed types as rewards.

## Commands

**Run the game (desktop):**
```
godot --path /Users/wenxinfang/game-lab/echo-garden
```

**Headless web export → GitHub Pages:**
```
cd /Users/wenxinfang/game-lab/echo-garden
./deploy.sh
```
`deploy.sh` exports the game, commits to `../github/wxfang.github.io/echo-garden/`, and pushes. It checks for web export templates first and exits with instructions if missing.

**Install web export templates (one-time, if missing):**
```
python3 /tmp/fetch_web_templates.py   # downloads ~84 MB via ZIP range requests
```
Or: open the Godot editor → Editor → Export Templates → Download and Install.

**Export only (no push):**
```
godot --headless --export-release "Web" /path/to/out/index.html --path .
```

## Architecture

All game logic lives in two scripts. There are no scene hierarchies, assets, or autoloads — the entire UI is built in code.

### `garden_cell.gd` (`class_name GardenCell`, extends `Button`)
Self-contained cell node. Owns its state and all visuals.

- **State:** `stage: int` (0–5, uses `Stage` enum), `waters: int`, `seed_type: int`, `neighbor_support: int`
- **Visuals:** Background color via `StyleBoxFlat` overrides set in `_refresh()`. Plant shapes drawn in `_draw()` using only `draw_circle`, `draw_line`, `draw_rect` — no fonts or child nodes. Water progress is a `draw_rect` bar at the bottom.
- **Signals:** `wants_plant` (emitted when EMPTY cell is clicked — garden decides what seed to plant), `acted(cell, event, message)` (emitted after every state change)
- **`plant(type)` vs `plant_silent(type)`:** `plant()` emits `acted`; `plant_silent()` is used by the garden for spreading and does not emit.
- **`effective_waters_needed()`:** Returns `WATERS_NEEDED[stage]` minus 1 if `neighbor_support >= 2` (minimum 1). Garden sets `neighbor_support` after each turn.
- **Font warning:** Do NOT use `Label` child nodes or `Button.text` for game symbols in web export. Godot subsets fonts at build time and strips dynamically-assigned glyphs. All plant visuals must go through `_draw()`.

### `garden.gd` (extends `Control`)
Root scene script. Owns the grid, seed inventory, and all game rules.

- **`_cells: Array[GardenCell]`** — flat array of 36 cells, row-major (`index = row * 6 + col`).
- **Seed inventory:** `_bag: Dictionary` (SeedType → count). COMMON is unlimited (not tracked). `_selected: int` is the active seed type. Seed panel buttons appear lazily as seeds are discovered (`_discovered: Array[bool]`).
- **Turn flow:** Every cell interaction calls `_on_cell_acted` → updates neighbor support → checks spreading/awakening (on "bloomed") → checks milestone rewards. Multiple systems may overwrite `_status.text` in sequence; the last one wins.
- **Neighbor support:** `_update_neighbor_support()` scans all 36 cells after every action (O(36), trivially fast). Sets `cell.neighbor_support` and calls `cell._refresh()` only when the value changes.
- **Spreading:** On "bloomed", each orthogonal empty neighbor has 30% chance of `plant_silent()` with the source's seed type.
- **Awakening:** When all 36 cells are simultaneously `BLOOMED`, a golden `Tween`-animated overlay flashes and seeds are awarded. Debounced by `_last_awakening_turn` (min 10 turns between triggers).
- **Reward milestones:** Ember every 3rd harvest; Frost first time 5+ plants are ≥SPROUT; Twilight when any row has no EMPTY cells; Radiant 25% chance on harvesting a non-COMMON bloom.

## Web Export Notes

- `export_presets.cfg` targets `res://garden.tscn` and injects `<script src="coi-serviceworker.js">` via `html/head_include`.
- `coi-serviceworker.js` in `wxfang.github.io/echo-garden/` adds `Cross-Origin-Opener-Policy` and `Cross-Origin-Embedder-Policy` headers via a service worker. GitHub Pages cannot set these headers natively; they are required for Godot's audio worklet.
- The `.wasm` is ~36 MB. The `.pck` is small (~23 KB) because the project has no binary assets.
