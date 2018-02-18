package com.pm.action;

import java.util.List;

import com.opensymphony.xwork2.ActionSupport;
import com.pm.entity.Menus;
import com.pm.service.MenusService;

public class MenusAction extends ActionSupport{
	private Menus menus;
	private List<Menus> menuss;
	private MenusService menusService;
	private int id;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Menus getMenus() {
		return menus;
	}
	public void setMenus(Menus menus) {
		this.menus = menus;
	}
	public List<Menus> getMenuss() {
		return menuss;
	}
	public void setMenuss(List<Menus> menuss) {
		this.menuss = menuss;
	}
	public MenusService getMenusService() {
		return menusService;
	}
	public void setMenusService(MenusService menusService) {
		this.menusService = menusService;
	}
	
	public String findMenusAll() throws Exception{
		menuss = menusService.findAllMenus();
		if(menuss==null){
			return ERROR;
		}
		return SUCCESS;
	}
	
	public String saveMenus() throws Exception{
		menus.setMenu_name(menus.getMenu_name());
		
		return SUCCESS;
	}
	
	public String deleteMenus() throws Exception{
		menusService.findByMenusId(id);
		menusService.deleteMenus(menus);
		menusService.findAllMenus();
		return SUCCESS;
	}
	
}
