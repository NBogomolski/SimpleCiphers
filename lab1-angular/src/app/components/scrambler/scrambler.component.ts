import { ThrowStmt } from '@angular/compiler';
import { Component, Input } from '@angular/core';

export enum Method {
  column,
  visioner,
  playfair,
}

@Component({
  selector: 'app-scrambler',
  templateUrl: './scrambler.component.html',
  styleUrls: ['./scrambler.component.scss'],
})
export class ScramblerComponent {
  toPerform: any;
  afterCalc: any;
  key: any;
  blockWidth: any;
  @Input() method: Method | undefined;
  @Input() isEncrypt: boolean | undefined;

  onToggleChange() {
    this.afterCalc = '';
  }

  calc() {
    this.toPerform = this.toPerform.replace(/\s/g, '');
    switch (this.method) {
      case Method.column:
        this.afterCalc = this.isEncrypt
          ? this.columnEncrypt()
          : this.columnDecrypt();
        break;
      case Method.visioner:
        this.afterCalc = this.isEncrypt
          ? this.visionerEncrypt()
          : this.visionerDecrypt();
        break;
      case Method.playfair:
        this.afterCalc = this.isEncrypt
          ? this.playfairEncrypt()
          : this.playfairDecrypt();
        break;
    }
  }

  columnEncrypt(): string {
    let encrypted = '';
    let precedence: number[] = this.setPrecedence(this.key);
    const arrHeight = Math.ceil(this.toPerform.length / this.key.length);
    let matrix = [];
    let startInd = 0;
    for (let i = 0; i < arrHeight; i++) {
      // matrix.fill(this.toPerform.slice(0, matrix.length-1));
      let substring = this.toPerform.slice(
        startInd,
        startInd + this.key.length
      );
      matrix.push([...substring]);
      startInd += this.key.length;
    }
    for (let j = 0; j < this.key.length; j++) {
      for (let i = 0; i < arrHeight; i++) {
        encrypted += matrix[i][precedence.indexOf(j)]
          ? matrix[i][precedence.indexOf(j)]
          : '';
      }
    }

    return encrypted;
  }

  //the lower the number - the more the presedence
  setPrecedence(key: string): Array<number> {
    let sortedKey = [...key].sort();
    let sortedInd = 0,
      priorityInd = 0;
    let precedence = new Array<number>(key.length);
    // let copyOfKey = key;
    [...key].forEach((val, ind) => {
      sortedInd = sortedKey.indexOf(val);
      precedence[ind] = sortedInd;
      sortedKey[sortedInd] = '';
    });
    return precedence;
  }

  columnDecrypt(): string {
    let message = '';
    let keyPrecedence = this.setPrecedence(this.key);
    const arrHeight = Math.ceil(this.toPerform.length / this.key.length);
    const fullColumnsLength =
      this.toPerform.length - this.key.length * (arrHeight - 1);
    let matrix = [];
    for (let i = 0; i < arrHeight; i++) {
      matrix[i] = new Array(this.key.length).fill('');
    }
    for (let j = 0, encryptedInd = 0; j < this.key.length; j++) {
      let soughtInd = keyPrecedence.indexOf(j);
      for (let i = 0; i < arrHeight; i++) {
        if (i == arrHeight - 1 && soughtInd >= fullColumnsLength) {
          break;
        }
        matrix[i][soughtInd] = this.toPerform.charAt(encryptedInd++);
      }
    }
    for (let i = 0; i < arrHeight; i++) {
      message += matrix[i].join('');
    }

    return message;
  }

  visionerEncrypt(): string {
    const rusAlphabetCapital = [...'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'],
      rusAlphabet = [...'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'];
    let encrypted = '';
    const autoKey = this.generateAutoKey();
    // let cypherMatrix = rusAlphabetCapital.slice();
    for (let i = 0; i < this.toPerform.length; i++) {
      if (rusAlphabetCapital.includes(this.toPerform.charAt(i))) {
        encrypted += this.encipherCharVisioner(
          this.toPerform.charAt(i),
          autoKey.charAt(i),
          rusAlphabetCapital
        );
      } else {
        encrypted += this.encipherCharVisioner(
          this.toPerform.charAt(i),
          autoKey.charAt(i),
          rusAlphabet
        );
      }
    }
    return encrypted;
  }

  generateAutoKey(): string {
    let autoKey = this.key;
    if (this.toPerform.length > this.key.length) {
      autoKey += this.toPerform.slice(
        0,
        this.toPerform.length - this.key.length + 1
      );
    } else {
      autoKey = autoKey.slice(0, this.toPerform.length);
    }
    return autoKey;
  }

  encipherCharVisioner(plaintextChar: string, startChar: string, alphabet: string[]): string {
    return alphabet[
      (alphabet.indexOf(startChar) + 
      alphabet.indexOf(plaintextChar)) %
        alphabet.length
    ];
  }

  decipherCharVisioner(ciphertextChar: string, keyChar: string, alphabet: string[]): string {
    const offsetInd = (alphabet.indexOf(ciphertextChar) - alphabet.indexOf(keyChar));
    return alphabet[(offsetInd >= 0 ? offsetInd : alphabet.length + offsetInd)];
  }

  visionerDecrypt() {
    let decrypted = '';
    const rusAlphabetCapital = [...'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'],
      rusAlphabet = [...'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'];
    const autoKey = this.generateAutoKey();
    for (let i = 0; i < this.toPerform.length; i++) {
      if (rusAlphabetCapital.includes(this.toPerform.charAt(i))) {
        decrypted += this.decipherCharVisioner(
          this.toPerform.charAt(i),
          autoKey.charAt(i),
          rusAlphabetCapital
        );
      } else {
        decrypted += this.decipherCharVisioner(
          this.toPerform.charAt(i),
          autoKey.charAt(i),
          rusAlphabet
        );
      }
    }
    return decrypted;
  }
  playfairEncrypt() {}
  playfairDecrypt() {}
}
