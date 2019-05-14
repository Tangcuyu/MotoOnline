import { Injectable } from '@angular/core';
import { IMenuItem } from '../models/model';


@Injectable({
  providedIn: 'root'
})
export class TranslateKeyService {

  constructor(
  ) { }

  /* 添加key到从服务返回的菜单数据数组中，用于翻译模块根据key查找翻译字符串 */
  public translateKeyMenu(arr: IMenuItem[], key: string) {
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      element.translateKey = this.addMenuKey(key, i);
      for (let subi = 0; subi < element.subItems.length; subi++) {
        const subelement = element.subItems[subi];
        subelement.translateKey = this.addSubMenuKey(key, i, subi)
      }
    }
    return arr;
  }

  /* 增加主菜单的翻译key： 
   * 翻译key需要和翻译文件assets/i18n/zh.json, en.json中的位置相互对应。 
   * 例如：‘menu’ + '.item' + 0 + '.name' 对应于zh.json文件中的 menu.item0.name 
   */
  private addMenuKey(key, index) {
    return key + '.item' + index + '.name';
  }

  // 增加子菜单的翻译key
  private addSubMenuKey(key, index, subindex) {
    return key + '.item' + index + '.submenu.sub' + (subindex + 1) + '.name';
  }
}
