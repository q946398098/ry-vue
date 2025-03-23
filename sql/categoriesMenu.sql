-- 菜单 SQL
insert into sys_menu (menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
values('文章与分类关联，', '2000', '1', 'categories', 'blog/categories/index', 1, 0, 'C', '0', '0', 'blog:categories:list', '#', 'admin', sysdate(), '', null, '文章与分类关联，菜单');

-- 按钮父菜单ID
SELECT @parentId := LAST_INSERT_ID();


select * from

-- 按钮 SQL
insert into sys_menu (menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
values('文章与分类关联，查询', @parentId, '1',  '#', '', 1, 0, 'F', '0', '0', 'blog:categories:query',        '#', 'admin', sysdate(), '', null, '');

insert into sys_menu (menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
values('文章与分类关联，新增', @parentId, '2',  '#', '', 1, 0, 'F', '0', '0', 'blog:categories:add',          '#', 'admin', sysdate(), '', null, '');

insert into sys_menu (menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
values('文章与分类关联，修改', @parentId, '3',  '#', '', 1, 0, 'F', '0', '0', 'blog:categories:edit',         '#', 'admin', sysdate(), '', null, '');

insert into sys_menu (menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
values('文章与分类关联，删除', @parentId, '4',  '#', '', 1, 0, 'F', '0', '0', 'blog:categories:remove',       '#', 'admin', sysdate(), '', null, '');

insert into sys_menu (menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
values('文章与分类关联，导出', @parentId, '5',  '#', '', 1, 0, 'F', '0', '0', 'blog:categories:export',       '#', 'admin', sysdate(), '', null, '');