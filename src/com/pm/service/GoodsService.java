package com.pm.service;

import java.util.List;

import com.pm.entity.Goods;
import com.pm.entity.Page;

public interface GoodsService {
	public void saveGoods(Goods g);
	public void deleteGoods(Goods g);
	public void updateGoods(Goods g);
	public Goods  findByIdGoods(int id);
	public List<Goods> findAllGoods();
	public List<Goods> findAllGoods2();
}
