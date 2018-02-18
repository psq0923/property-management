package com.pm.service;

import java.util.List;

import com.pm.entity.Building;
import com.pm.entity.Page;

public interface BuildingService {
	public void save(Building b);
	public void delete(Building b);
	public void update(Building b);
	public List<Building> findAllBuilding();
	public List<Building> findAllBuilding2();
	public Building findById(int id);
	public Page queryForPage(int pageSize, int currentPage,String title);
}
