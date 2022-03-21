import { ThrowStmt } from '@angular/compiler';
import { Component, Input } from '@angular/core';
// import { SSL_OP_NO_TLSv1_2 } from 'constants';

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

  visionerDecryptWithin(startInd: number, endInd: number, autoKey: string, ): string {
    const rusAlphabetCapital = [...'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'],
      rusAlphabet = [...'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'];
    let decrypted = '';
    for (let i = startInd; i < endInd; i++) {
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

  generateAutoKeyDecryption(): string {
    if (this.key.length >= this.toPerform.length) {
      return this.generateAutoKey();
    } else {
      let autoKeyRestored = this.key, decipherInd = 0; 
      while (this.toPerform.length > autoKeyRestored.length) {
        if (this.key.length > (this.toPerform.length - decipherInd)) {
          autoKeyRestored += this.visionerDecryptWithin(
            decipherInd,
            this.toPerform.length,
            autoKeyRestored
          );
        } else {
          autoKeyRestored += this.visionerDecryptWithin(
            decipherInd,
            decipherInd+this.key.length,
            autoKeyRestored
          );
        }
        decipherInd += this.key.length;
      }
      return autoKeyRestored;
    }
  }

  visionerDecrypt() {
    const autoKey = this.generateAutoKeyDecryption();
    let decrypted = autoKey.slice(this.key.length);
    decrypted += this.visionerDecryptWithin(decrypted.length, this.toPerform.length, autoKey);
    return decrypted;
  }

  playfairEncrypt() {
    const matrix = [
      [...'crypt'],
      [...'ogahb'],
      [...'defik'],
      [...'lmnqs'],
      [...'uvwxz'],
    ];
    let encrypted = '';
    for(let currChar = 0; encrypted.length < this.toPerform.length; currChar += 2) {
      let plainChar1 = this.toPerform.charAt(currChar), plainChar2 = this.toPerform.charAt(currChar + 1);
      let position1 = this.getPositionOf(plainChar1, matrix);
      let position2 = this.getPositionOf(plainChar2, matrix);
      if (!plainChar2) {
        plainChar2 = 'x'; 
        position2 = this.getPositionOf(plainChar2, matrix);
      }
      if (plainChar1 === plainChar2) {
        this.toPerform = this.toPerform.slice(0, currChar+1) + 'x' + this.toPerform.slice(currChar+1);
        plainChar2 = 'x';
        const quadrantValues = this.quadrantCharsPlayfair(
          plainChar1,
          plainChar2,
          matrix
        );
        encrypted += quadrantValues[0] + quadrantValues[1];
      } else if (position1[0] == position2[0]) {
        encrypted += matrix[position1[0]][(position1[1] + 1) % matrix.length];
        encrypted += matrix[position2[0]][(position2[1] + 1) % matrix.length];
      } else if (position1[1] == position2[1]) {
        encrypted += matrix[(position1[0] + 1) % matrix.length][position1[1]];
        encrypted += matrix[(position2[0] + 1) % matrix.length][position2[1]];
      } else {
        const quadrantValues = this.quadrantCharsPlayfair(plainChar1, plainChar2, matrix);
        encrypted += quadrantValues[0] + quadrantValues[1];
      }
    }
    return encrypted;
  }

  quadrantCharsPlayfair(plainChar1: string, plainChar2: string, matrix: Array<Array<string>>): string[] {
    const position1 = this.getPositionOf(plainChar1, matrix);
    const position2 = this.getPositionOf(plainChar2, matrix);
    return [matrix[position1[0]][position2[1]], matrix[position2[0]][position1[1]]];
  }

  getPositionOf(plainChar: string, matrix: Array<Array<string>>): number[] {
    let indexes = new Array(2);
    for (let i in matrix) {
      if (matrix[i].indexOf(plainChar) != -1) {
        return [Number(i), matrix[i].indexOf(plainChar)];
      }
    }
    return [2, 3]; //j == i
  }

  playfairDecrypt() {
    const matrix = [
      [...'crypt'],
      [...'ogahb'],
      [...'defik'],
      [...'lmnqs'],
      [...'uvwxz'],
    ];
    let message = '';
    for (
      let currChar = 0;
      message.length < this.toPerform.length;
      currChar += 2
    ) {
      let cipherChar1 = this.toPerform.charAt(currChar),
        cipherChar2 = this.toPerform.charAt(currChar + 1);
      let position1 = this.getPositionOf(cipherChar1, matrix);
      let position2 = this.getPositionOf(cipherChar2, matrix);
      if (!cipherChar2) {
        cipherChar2 = 'x';
        position2 = this.getPositionOf(cipherChar2, matrix);
      }
      if (cipherChar1 === cipherChar2) {
        this.toPerform =
          this.toPerform.slice(0, currChar + 1) +
          'x' +
          this.toPerform.slice(currChar + 1);
        cipherChar2 = 'x';
        const quadrantValues = this.quadrantCharsPlayfair(
          cipherChar1,
          cipherChar2,
          matrix
        );
        message += quadrantValues[0] + quadrantValues[1];
      } else if (position1[0] == position2[0]) {
        position1[1] = position1[1] == 0 ? matrix.length : position1[1];
        position2[1] = position2[1] == 0 ? matrix.length : position2[1];
        message +=
          matrix[position1[0]][(position1[1] - 1) % matrix.length];
        message +=
          matrix[position2[0]][(position2[1] - 1) % matrix.length];
      } else if (position1[1] == position2[1]) {
        position1[0] = position1[0] == 0 ? matrix.length : position1[0];
        position2[0] = position2[0] == 0 ? matrix.length : position2[0];
        message +=
          matrix[(position1[0] - 1) % matrix.length][position1[1]];
        message +=
          matrix[(position2[0] - 1) % matrix.length][position2[1]];
      } else {
        const quadrantValues = this.quadrantCharsPlayfair(
          cipherChar1,
          cipherChar2,
          matrix
        );
        message += quadrantValues[0] + quadrantValues[1];
      }
    }
    if (message.length % 2 == 0 && message.charAt(message.length-1)) {
      message = message.slice(0, message.length-1);
    }
    return message;
  }
}
