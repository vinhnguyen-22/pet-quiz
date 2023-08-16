export function getDepartment(userId: number, workspace: any) {
    let department: any = null;
    workspace.departments.forEach((d: any) => {
        if (userId === d.admin_id) {
            department = d;
        }
    });
    return department;
}

export function getDepartmentName(departments: any) {
    let departmentName = '';
    if (departments) {
        departments.forEach((d: any) => {
            departmentName += ', ' + d.name;
        });
    }
    return departmentName.replace(', ', '');
}
