package com.pm.service.impl;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.pm.dao.BuildingDao;
import com.pm.entity.Building;
import com.pm.entity.News;
import com.pm.entity.Page;
import com.pm.service.BuildingService;

public class BuildingServiceImpl implements BuildingService {
	
	private BuildingDao buildingDao;
	
	public BuildingDao getBuildingDao() {
		return buildingDao;
	}

	public void setBuildingDao(BuildingDao buildingDao) {
		this.buildingDao = buildingDao;
	}

	@Override
	public void save(Building b) {
		buildingDao.save(b);
	}

	@Override
	public void delete(Building b) {
		buildingDao.delete(b);
	}

	@Override
	public void update(Building b) {
		buildingDao.update(b);
	}

	@Override
	public List<Building> findAllBuilding() {
		List<Building> bulidings = buildingDao.findAllBuilding();
		return bulidings;
	}

	@Override
	public Building findById(int id) {
		Building building = buildingDao.findById(id);
		return building;
	}

	@Override
	public List<Building> findAllBuilding2() {
		List<Building> bulidings = buildingDao.findAllBuilding2();
		return bulidings;
	}
	
	@Override
	public Page queryForPage(int pageSize, int page,String title) {
		String hql = "";
		if(title.equals("") || title==null){
			hql = "select count(*) from Building ";
		}else{
			hql = "select count(*) from Building where title like '%"+title+"%'";
		}
		
		int count = buildingDao.getCount(hql); // 总记录数
		int totalPage = Page.countTotalPage(pageSize, count); // 总页数
		int offset = Page.countOffset(pageSize, page); // 当前页开始记录
		int length = pageSize; // 每页记录数
		int currentPage = Page.countCurrentPage(page);
		List<Building> list;
		if(title.equals("") || title==null){
			list = buildingDao.queryForPage(" from Building", offset, length); // 该分页的记录
		}else{
			list = buildingDao.queryForPage(" from Building where title like '%"+title+"%'", offset, length); // 该分页的记录
		}
		
		HttpSession session = ServletActionContext. getRequest().getSession();
		if(list!=null&&list.size()>0){
			session.setAttribute("building_list", list);
		}else{
			session.removeAttribute("building_list");
		}
		// 把分页信息保存到Bean中
		Page pageBean = new Page();
		pageBean.setPageSize(pageSize);
		pageBean.setCurrentPage(currentPage);
		pageBean.setAllRow(count);
		pageBean.setTotalPage(totalPage);
		pageBean.setList(list);
		pageBean.init();
		return pageBean;
	}

}
