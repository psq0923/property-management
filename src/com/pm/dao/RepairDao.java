package com.pm.dao;

import java.util.List;

import com.pm.entity.Repair;

public interface RepairDao {
	public void save(Repair r);
	public void delete(Repair r);
	public void update(Repair r);
	public List<Repair> findAllRepairs();
	public Repair findById(int id);
}
