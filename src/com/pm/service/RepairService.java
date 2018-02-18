package com.pm.service;

import java.util.List;

import com.pm.entity.Repair;

public interface RepairService {
	public void save(Repair repair);
	public void delete(Repair r);
	public void update(Repair r);
	public List<Repair> findAllRepairs();
	public Repair findById(int id);
}
