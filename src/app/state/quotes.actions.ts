export class GetQuote {
  public static readonly type = '[Quotes page] Get quote';
}

export class GetOfflineQuotes {
  public static readonly type = '[App page] Get offline quotes';
}

export class AddRating {
  public static readonly type = '[Quotes page] Add rating';

  constructor(
    public readonly quoteId: string,
    public readonly rating: number
  ) {}
}
