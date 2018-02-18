package com.pm.dao;

import java.util.List;

import com.pm.entity.Building;

public interface BuildingDao {
	public void save(Building b);
	public void update(Building b);
	public List<Building> findAllBuilding();
	public List<Building> findAllBuilding2();
	public Building findById(int id);
	
	public void delete(Building b);
	/*分页查询*/
	public List<Building> queryForPage(String hql,int offset,int length);
	     
	/*总记录条数*/
	public int getCount(String hql);

}
