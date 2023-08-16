export class GetCurrentUserPresenter {
    username: string = '';
    limit: number = 0;
    page: number = 0;

    static presentItem(item: any) {
        return {
            id: item.id,
            username: item.username,
            full_name: item.full_name,
            group_ids: item.group_ids,
        };
    }
}
