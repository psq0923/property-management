package com.pm.service.impl;

import java.util.List;

import com.pm.dao.MenusDao;
import com.pm.entity.Menus;
import com.pm.service.MenusService;

public class MenusServiceImpl implements MenusService{
	private MenusDao menusDao;
	
	public MenusDao getMenusDao() {
		return menusDao;
	}

	public void setMenusDao(MenusDao menusDao) {
		this.menusDao = menusDao;
	}

	@Override
	public void saveMenus(Menus menus) {
		menusDao.saveMenus(menus);
	}

	@Override
	public void deleteMenus(Menus menus) {
		menusDao.deleteMenus(menus);
	}

	@Override
	public List<Menus> findAllMenus() {
		List<Menus> menuss = menusDao.findAllMenus();
		return menuss;
	}

	@Override
	public Menus findByMenusId(int id) {
		Menus menus = menusDao.findByMenusId(id);
		return menus;
	}

}
