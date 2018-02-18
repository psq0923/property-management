package com.pm.dao;

import java.util.List;

import com.pm.entity.Detail;


public interface DetailDao {
	public void save(Detail d);
	public void delete(Detail d);
	public void update(Detail d);
	public List<Detail> findAllDetails();
	public Detail findById(int id);
}
