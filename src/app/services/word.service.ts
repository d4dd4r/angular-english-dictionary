import { Word } from '../models/word.class';
import { WordDialog } from '../models/word-dialog.interface';

import { Subject } from 'rxjs/Subject';

export class WordService {
  public onWordUpdate = new Subject<Word[]>();
  private _words: Word[] = [];
  private lastId = 0;

  constructor() {
    this.words = [
      new Word('padding',   ['набивка', 'набивочный материал']),
      new Word('throw',     ['выкидывать', 'выбрасывать']),
      new Word('quash',     ['подавлять', 'сокрушить']),
      new Word('grind',     ['молоть', 'перемалывать']),
      new Word('reject',    ['отвергать', 'отклонять']),
      new Word('stuffing',  ['начинка', 'наполнение']),
      new Word('give up',   ['сдаваться', 'уступить']),
      new Word('hope',      ['надежда', 'надеяться']),
      new Word('oblique',   ['косой', 'наклонный']),
      new Word('place',     ['место', 'местечко']),
      new Word('beat',      ['бить', 'колотить']),
      new Word('hammer',    ['молоток', 'молот']),
      new Word('smite',     ['поразить', 'кара']),
      new Word('slash',     ['разрез', 'порез']),
      new Word('bare',      ['голый', 'пустой']),
      new Word('flank',     ['фланг', 'крыло']),
      new Word('slope',     ['склон', 'откос']),
      new Word('house',     ['дом', 'здание']),
      new Word('meat',      ['мясо', 'фарш']),
      new Word('stroke',    ['ход', 'удар']),
    ];
  }

  public get words(): Word[] {
    return this._words;
  }

  public set word(word: Word) {
    word.id = ++this.lastId;
    this._words.push(word);
    this.onWordUpdate.next(this.words);
  }

  public set words(words: Word[]) {
    words.forEach(word => this.word = word);
  }

  getWordById(id: number): Word {
    return this._words.find(word => word.id === id);
  }

  updateWord(word: WordDialog, id: number) {
    const index = this._words.findIndex(word => word.id === id);
    this._words[index].english = word.english;
    this._words[index].russian = word.translates;
    this.onWordUpdate.next(this.words);
  }

  removeWord(id: number) {
    const index = this._words.findIndex(word => word.id === id);
    this._words.splice(index, 1);
    this.onWordUpdate.next(this.words);
  }

}
