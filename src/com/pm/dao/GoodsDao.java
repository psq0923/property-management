package com.pm.dao;

import java.util.List;

import com.pm.entity.Goods;

public interface GoodsDao {
//	添加物品信息
	public void saveGoods(Goods g);
//	删除物品信息
	public void deleteGoods(Goods g);
//	修改物品信息
	public void updateGoods(Goods g);
// 	ID查找物品信息
	public Goods  findByIdGoods(int id);
//	查找物品信息
	public List<Goods> findAllGoods();
	public List<Goods> findAllGoods2();

}

