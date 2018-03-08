export const WORD_TYPES = {
  NEW: 1,
  KNOWN: 2,
  REMOVED: 3,
};

export class Word {
  public id: number;

  constructor(
    public english: string,
    public russian: string[],
    public type: number = WORD_TYPES.NEW,
  ) {}
}
