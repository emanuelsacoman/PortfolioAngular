import {
  DEFAULT_TECHNOLOGY_ID,
  getTechnologyById,
  resolveTechnologyIcon,
  TECHNOLOGY_CATALOG,
} from './technology-catalog';

describe('technology catalog', () => {
  it('keeps technology identifiers unique', () => {
    const ids = TECHNOLOGY_CATALOG.map((technology) => technology.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it('finds an option by a normalized identifier', () => {
    expect(getTechnologyById(' ANGULAR ')?.label).toBe('Angular');
  });

  it('prefers the catalog icon over a legacy URL', () => {
    expect(resolveTechnologyIcon('typescript', 'https://example.com/legacy.svg'))
      .toBe(getTechnologyById('typescript')!.iconPath);
  });

  it('preserves a legacy URL when no catalog identifier exists', () => {
    expect(resolveTechnologyIcon(undefined, 'https://example.com/legacy.svg'))
      .toBe('https://example.com/legacy.svg');
  });

  it('uses the generic icon when no icon data exists', () => {
    expect(resolveTechnologyIcon()).toBe(getTechnologyById(DEFAULT_TECHNOLOGY_ID)!.iconPath);
  });
});
