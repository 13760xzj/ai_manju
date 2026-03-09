import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/store/hooks';
import type { Asset, Work, AssetCategory } from '@/types';
import { ASSET_CATEGORIES, STYLE_SUBCATEGORIES } from '@/utils';
import { Toolbar, AssetCard, WorkCard, DetailPanel } from '@/components/features';
import {
  setSelectedCategory,
  setViewMode,
  setSearchQuery,
  setSelectedItem,
  setDetailPanelOpen,
  fetchAssets,
  fetchWorks
} from '@/store/slices/assetSlice';
import type { RootState } from '@/store';
import './index.css';

export function PersonalAssetsPage() {
  const dispatch = useAppDispatch();
  const { assets, works, selectedCategory, viewMode, searchQuery, selectedItem, isDetailPanelOpen, assetsStatus, worksStatus } =
    useSelector((state: RootState) => state.asset);

  useEffect(() => {
    dispatch(fetchAssets(undefined));
    dispatch(fetchWorks());
  }, [dispatch]);

  const [activeSection, setActiveSection] = useState<'material' | 'style' | 'works'>('material');
  const [expandedStyleFolder, setExpandedStyleFolder] = useState(false);
  const [selectedStyleFilter, setSelectedStyleFilter] = useState<string | null>(null);
  const [selectedWorkFilter, setSelectedWorkFilter] = useState<string | null>(null);
  const [selectedMaterialCategory, setSelectedMaterialCategory] = useState<string | null>(null);

  const handleMaterialClick = (categoryId: string) => {
    setSelectedMaterialCategory(categoryId);
    setSelectedStyleFilter(null);
    setSelectedWorkFilter(null);
    setActiveSection('material');
    dispatch(setSelectedCategory(categoryId));
  };

  const handleStyleSubcategoryClick = (subcategoryId: string) => {
    setSelectedMaterialCategory(null);
    setSelectedStyleFilter(subcategoryId);
    setSelectedWorkFilter(null);
    setActiveSection('style');
    dispatch(setSelectedCategory('all'));
  };

  const handleWorkClick = () => {
    setSelectedMaterialCategory(null);
    setSelectedStyleFilter(null);
    setSelectedWorkFilter('all');
    setActiveSection('works');
  };

  const isSceneCategory = selectedMaterialCategory === 'scene';
  const isCharacterCategory = selectedMaterialCategory === 'character';
  const isPropCategory = selectedMaterialCategory === 'prop';
  const isFileCategory = selectedMaterialCategory === 'file';
  const isPoseCategory = selectedMaterialCategory === 'pose';
  const isEffectCategory = selectedMaterialCategory === 'effect';
  const isExpressionCategory = selectedMaterialCategory === 'expression';
  const isMyStyleCategory = activeSection === 'style' && selectedStyleFilter === 'my-style';
  const isFeaturedStyleCategory = activeSection === 'style' && selectedStyleFilter === 'featured-style';

  const getBreadcrumbCategoryName = () => {
    if (activeSection === 'style') {
      return selectedStyleFilter === 'my-style' ? '我的风格库' : selectedStyleFilter === 'featured-style' ? '精选风格库' : '风格库';
    }
    if (activeSection === 'material' && selectedMaterialCategory) {
      const categoryMap: Record<string, string> = {
        'scene': '场景库',
        'character': '角色库',
        'prop': '道具库',
        'file': '文件库',
        'pose': '姿势库',
        'effect': '特效库',
        'expression': '表情库'
      };
      return categoryMap[selectedMaterialCategory] || '素材库';
    }
    return activeSection === 'material' ? '素材库' : '我的作品';
  };

  const breadcrumbCategoryName = getBreadcrumbCategoryName();

  const handleItemClick = (item: Asset | Work) => {
    dispatch(setSelectedItem(item));
    dispatch(setDetailPanelOpen(true));
  };

  const handleCloseDetail = () => {
    dispatch(setDetailPanelOpen(false));
  };

  const filteredAssets = assets.filter(asset => {
    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory;
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredWorks = works.filter(work =>
    work.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [activeTab, setActiveTab] = useState<'personal' | 'company'>('personal');
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['material', 'works']);

  const toggleFolder = (folder: string) => {
    setExpandedFolders(prev => 
      prev.includes(folder) 
        ? prev.filter(f => f !== folder)
        : [...prev, folder]
    );
  };

  return (
    <div className="personal-assets-page">
      <aside className="assets-sidebar">
        <div className="sidebar-header">资源管理器</div>
        <nav className="assets-nav">
          <div className="folder-tree">
            <div 
              className="tree-item folder"
              onClick={() => toggleFolder('material')}
            >
              <span className="folder-icon">{expandedFolders.includes('material') ? '📂' : '📁'}</span>
              <span className="folder-name">素材库</span>
            </div>
            {expandedFolders.includes('material') && (
              <div className="tree-children">
                {ASSET_CATEGORIES.filter(cat => cat.id !== 'style').map(cat => (
                  <div
                    key={cat.id}
                    className={`tree-item ${selectedMaterialCategory === cat.id ? 'active' : ''}`}
                    onClick={() => handleMaterialClick(cat.id)}
                  >
                    <span className="item-icon">📄</span>
                    <span className="item-name">{cat.name}</span>
                  </div>
                ))}
              </div>
            )}
            
            <div 
              className="tree-item folder"
              onClick={() => {
                setExpandedStyleFolder(!expandedStyleFolder);
              }}
            >
              <span className="folder-icon">{expandedStyleFolder ? '📂' : '📁'}</span>
              <span className="folder-name">风格库</span>
            </div>
            {expandedStyleFolder && (
              <div className="tree-children">
                {STYLE_SUBCATEGORIES.map(subcat => (
                  <div
                    key={subcat.id}
                    className={`tree-item ${selectedStyleFilter === subcat.id ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStyleSubcategoryClick(subcat.id);
                    }}
                  >
                    <span className="item-icon">📄</span>
                    <span className="item-name">{subcat.name}</span>
                  </div>
                ))}
              </div>
            )}
            
            <div 
              className="tree-item folder"
              onClick={() => toggleFolder('works')}
            >
              <span className="folder-icon">{expandedFolders.includes('works') ? '📂' : '📁'}</span>
              <span className="folder-name">我的作品</span>
            </div>
            {expandedFolders.includes('works') && (
              <div className="tree-children">
                <div
                  className={`tree-item ${selectedWorkFilter === 'all' ? 'active' : ''}`}
                  onClick={handleWorkClick}
                >
                  <span className="item-icon">🎬</span>
                  <span className="item-name">全部作品</span>
                </div>
              </div>
            )}
          </div>
        </nav>
      </aside>

      <main className="assets-main">
        <div className="assets-tabs">
          <button
            className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            个人资产库
          </button>
          <button
            className={`tab-btn ${activeTab === 'company' ? 'active' : ''}`}
            onClick={() => setActiveTab('company')}
          >
            公司资产库
          </button>
        </div>

        <div className="assets-breadcrumb">
          <span className="breadcrumb-item">首页</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-item">{activeTab === 'personal' ? '个人资产库' : '公司资产库'}</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-item active">{breadcrumbCategoryName}</span>
        </div>

        <div className="assets-content">
          {activeTab === 'company' ? (
            <div className="empty-state">
              <div className="empty-icon">🏢</div>
              <div className="empty-text">公司资产库暂未开放</div>
            </div>
          ) : activeSection === 'style' && selectedStyleFilter ? (
            <>
              {assetsStatus.loading && <div className="loading-placeholder">加载中...</div>}
              {assetsStatus.error && <div className="error-placeholder">{assetsStatus.error}</div>}
              {!assetsStatus.loading && !assetsStatus.error && (
                <div className={`material-grid view-${viewMode}`}>
                  {isMyStyleCategory && (
                    <div className="style-add-box">
                      <div className="style-add-content">
                        <div className="style-add-icon">+</div>
                        <div className="style-add-text">添加我的风格</div>
                      </div>
                    </div>
                  )}
                  {isFeaturedStyleCategory && (
                    <div className="style-featured-placeholder">
                      <div className="style-featured-content">
                        <div className="style-featured-icon">🌟</div>
                        <div className="style-featured-text">精选风格库</div>
                        <div className="style-featured-desc">浏览精选风格模板</div>
                      </div>
                    </div>
                  )}
                  <div className="empty-state">
                    <div className="empty-icon"></div>
                    <div className="empty-text">
                      {isMyStyleCategory ? '暂无风格，点击添加' : '暂无精选风格'}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : activeSection === 'material' ? (
            <>
              {assetsStatus.loading && <div className="loading-placeholder">加载中...</div>}
              {assetsStatus.error && <div className="error-placeholder">{assetsStatus.error}</div>}
              {!assetsStatus.loading && !assetsStatus.error && (
                  <div className={`material-grid view-${viewMode}`}>
                    {isSceneCategory && (
                      <div className="scene-add-box">
                        <div className="scene-add-content">
                          <div className="scene-add-icon">+</div>
                          <div className="scene-add-text">添加场景图</div>
                        </div>
                      </div>
                    )}
                    {isCharacterCategory && (
                      <div className="character-add-box">
                        <div className="character-add-content">
                          <div className="character-add-icon">+</div>
                          <div className="character-add-text">添加角色图</div>
                        </div>
                      </div>
                    )}
                    {isPropCategory && (
                      <div className="prop-add-box">
                        <div className="prop-add-content">
                          <div className="prop-add-icon">+</div>
                          <div className="prop-add-text">添加道具图</div>
                        </div>
                      </div>
                    )}
                    {isFileCategory && (
                      <div className="file-add-box">
                        <div className="file-add-content">
                          <div className="file-add-icon">📁</div>
                          <div className="file-add-text">上传文件夹</div>
                        </div>
                      </div>
                    )}
                    {isPoseCategory && (
                      <div className="pose-add-box">
                        <div className="pose-add-content">
                          <div className="pose-add-icon">+</div>
                          <div className="pose-add-text">添加姿势图</div>
                        </div>
                      </div>
                    )}
                    {isEffectCategory && (
                      <div className="effect-add-box">
                        <div className="effect-add-content">
                          <div className="effect-add-icon">+</div>
                          <div className="effect-add-text">添加特效图</div>
                        </div>
                      </div>
                    )}
                    {isExpressionCategory && (
                      <div className="expression-add-box">
                        <div className="expression-add-content">
                          <div className="expression-add-icon">+</div>
                          <div className="expression-add-text">添加表情图</div>
                        </div>
                      </div>
                    )}
                    {filteredAssets.map(asset => (
                    <AssetCard
                      key={asset.id}
                      asset={asset}
                      viewMode={viewMode}
                      onClick={handleItemClick}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              {worksStatus.loading && <div className="loading-placeholder">加载中...</div>}
              {worksStatus.error && <div className="error-placeholder">{worksStatus.error}</div>}
              {!worksStatus.loading && !worksStatus.error && (
                <div className={`works-grid view-${viewMode}`}>
                  {filteredWorks.map(work => (
                    <WorkCard
                      key={work.id}
                      work={work}
                      viewMode={viewMode}
                      onClick={handleItemClick}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <DetailPanel
        item={selectedItem}
        isOpen={isDetailPanelOpen}
        onClose={handleCloseDetail}
        categories={[...ASSET_CATEGORIES]}
      />
    </div>
  );
}
