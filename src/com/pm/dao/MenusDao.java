package com.pm.dao;

import java.util.List;

import com.pm.entity.Menus;

public interface MenusDao {
	/*增加菜单*/
	public void saveMenus(Menus menus);
	
	/*删除菜单*/
	public void deleteMenus(Menus menus);
	
	/*查询所有菜单*/
	public List<Menus> findAllMenus();
	
	/*查询一个*/
	public Menus findByMenusId(int id);
}
