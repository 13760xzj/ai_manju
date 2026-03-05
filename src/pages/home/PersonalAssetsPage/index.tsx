import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/store/hooks';
import type { Asset, Work, AssetCategory } from '@/types';
import { ASSET_CATEGORIES } from '@/utils';
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

  const [activeSection, setActiveSection] = useState<'material' | 'works'>('material');

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

  return (
    <div className="personal-assets-page">
      <aside className="assets-sidebar">
        <nav className="assets-nav">
          <div
            className={`nav-item ${activeSection === 'material' ? 'active' : ''}`}
            onClick={() => setActiveSection('material')}
          >
            <span className="nav-icon">📦</span>
            <span className="nav-text">素材库</span>
          </div>
          <div
            className={`nav-item ${activeSection === 'works' ? 'active' : ''}`}
            onClick={() => setActiveSection('works')}
          >
            <span className="nav-icon">🎬</span>
            <span className="nav-text">我的作品</span>
          </div>
        </nav>
      </aside>

      <main className="assets-main">
        <Toolbar
          title={activeSection === 'material' ? '素材库' : '我的作品'}
          viewMode={viewMode}
          onViewModeChange={(mode) => dispatch(setViewMode(mode))}
          searchQuery={searchQuery}
          onSearchChange={(query) => dispatch(setSearchQuery(query))}
          categories={activeSection === 'material' ? [...ASSET_CATEGORIES] : undefined}
          selectedCategory={selectedCategory}
          onCategoryChange={(cat) => dispatch(setSelectedCategory(cat as AssetCategory))}
        />

        <div className="assets-content">
          {activeSection === 'material' ? (
            <>
              {assetsStatus.loading && <div className="loading-placeholder">加载中...</div>}
              {assetsStatus.error && <div className="error-placeholder">{assetsStatus.error}</div>}
              {!assetsStatus.loading && !assetsStatus.error && (
                <div className={`material-grid view-${viewMode}`}>
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
