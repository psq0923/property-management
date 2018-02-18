 package com.pm.action;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;
import com.pm.entity.Building;
import com.pm.entity.Page;
import com.pm.service.BuildingService;

public class BuildingAction extends ActionSupport{
      
	private Building building;
	private List<Building> buildings;
	private BuildingService buildingService;
	private int id;
	private int page; //第几页
    private Page pageBean;
    
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public Page getPageBean() {
		return pageBean;
	}
	public void setPageBean(Page pageBean) {
		this.pageBean = pageBean;
	}
	public Building getBuilding() {
		return building;
	}
	public void setBuilding(Building building) {
		this.building = building;
	}
	public List<Building> getBuildings() {
		return buildings;
	}
	public void setBuildings(List<Building> buildings) {
		this.buildings = buildings;
	}
	public BuildingService getBuildingService() {
		return buildingService;
	}
	public void setBuildingService(BuildingService buildingService) {
		this.buildingService = buildingService;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public String findBuildingPageList() {
        pageBean = buildingService.queryForPage(8, page,"");
        HttpSession session = ServletActionContext. getRequest().getSession();
        session.setAttribute("pageSize", pageBean.getPageSize());
        session.setAttribute("currentPage", pageBean.getCurrentPage());
        return SUCCESS;
    }
	
	@Override
	public String execute() throws Exception {
		building.setBuilding_name(building.getBuilding_name());
		building.setRoom_num(building.getRoom_num());
		building.setStatus(building.getStatus());
		
		buildingService.save(building);
		pageBean = buildingService.queryForPage(8, page,"");
		return SUCCESS;
	}
	
	public String delete() throws Exception{
		building = buildingService.findById(id);
		buildingService.delete(building);
		pageBean = buildingService.queryForPage(8, page,"");
		return SUCCESS;
	}
	
	public String update() throws Exception{
		Building b = new Building();
		b = buildingService.findById(building.getBuilding_id());
		b.setBuilding_name(building.getBuilding_name());

		b.setRoom_num(building.getRoom_num());
		int status=building.getStatus();
		b.setStatus(status);
		buildingService.update(b);
		pageBean = buildingService.queryForPage(8, page,"");
		return SUCCESS;
	}
	
	public String findAllBuilding() throws Exception{
		
		buildings = buildingService.findAllBuilding();
		if(buildings == null){
			return ERROR;
		}
		return SUCCESS;
	}
	public String findAllBuilding2() throws Exception{
		
		buildings = buildingService.findAllBuilding2();
		if(buildings == null){
			return ERROR;
		}
		return SUCCESS;
	}
	public String findById() throws Exception{
		building = buildingService.findById(id);
		if(building == null){
			return ERROR;
		}
		return SUCCESS;
	}
}
