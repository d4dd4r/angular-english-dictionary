import { Word } from '../models/word.class';

export class WordService {
  private _words: Word[] = [];
  private lastId = 0;

  constructor() {
    this.words = [
      new Word('house',     ['дом', 'здание']),
      new Word('place',     ['место', 'местечко']),
      new Word('grind',     ['молоть', 'перемалывать']),
      new Word('meat',      ['мясо', 'фарш']),
      new Word('stuffing',  ['начинка', 'наполнение']),
      new Word('padding',   ['набивка', 'набивочный материал']),
      new Word('flank',     ['фланг', 'крыло']),
      new Word('slope',     ['склон', 'откос']),
      new Word('oblique',   ['косой', 'наклонный']),
      new Word('slash',     ['разрез', 'порез']),
      new Word('stroke',    ['ход', 'удар']),
      new Word('beat',      ['бить', 'колотить']),
      new Word('hammer',    ['молоток', 'молот']),
      new Word('smite',     ['поразить', 'кара']),
      new Word('bare',      ['голый', 'пустой']),
      // new Word('null',      ['недействительный', 'несуществующий']),
      new Word('quash',     ['подавлять', 'сокрушить']),
      new Word('give up',   ['сдаваться', 'уступить']),
      new Word('reject',    ['отвергать', 'отклонять']),
      new Word('throw',     ['выкидывать', 'выбрасывать']),
    ];
  }

  public get words(): Word[] {
    return this._words;
  }

  public set word(word: Word) {
    word.id = ++this.lastId;
    this._words.push(word);
  }

  public set words(words: Word[]) {
    words.forEach(word => this.word = word);
  }

  wordById(id: number): Word {
    return this._words.find(word => word.id === id);
  }

}
