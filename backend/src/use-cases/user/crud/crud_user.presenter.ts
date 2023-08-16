import { Min } from "class-validator";
export class CrudUserPresenter {
  @Min(1)
  username: string = "";
  limit: number = 0;
  page: number = 0;

  static presentList(data: any) {
    var items = data.items.map((item: any) => {
      return this.presentItem(item);
    });
    data.items = items;
    return data;
  }

  static presentItem(item: any) {
    return {
      id: item.id,
      username: item.username,
      full_name: item.full_name,
      group_ids: item.group_ids,
    };
  }
}
