/* 商品列表类型定义 */

export class ItemsListItem {
  id: string;
  display_price: number;
  image: string;
  title: string;
  color: string;
  category: string;
  productBrief?: string;
  productDetail?: string;
  selling_price?: number;
  is_favorited_by_current_user?: boolean;
  constructor(inputObj) {
    if (inputObj) {
      this.id = inputObj.id;
      this.display_price = Number(inputObj.display_price);
      this.image = inputObj.image;
      this.title = inputObj.title;
      this.color = inputObj.color;
      this.category = inputObj.category;
      this.is_favorited_by_current_user = inputObj.is_favorited_by_current_user;
      this.selling_price = inputObj.selling_price;
    }
  }
}
