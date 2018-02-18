package com.pm.service;

import java.util.List;

import com.pm.entity.Detail;
import com.pm.entity.Page;

public interface DetailService {
	public void save(Detail d);
	public void delete(Detail d);
	public void update(Detail d);
	public List<Detail> findAllDetails();
	public Detail findById(int id);
}
