import React, { Component } from 'react'
import { Menu } from 'antd'
import { AppstoreOutlined } from '@ant-design/icons'

const { SubMenu } = Menu;
import styles from './PlancontrolPage.module.scss'
import mapConfiger from '../utils/minemapConf'

class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mainHomePage: false
    }
  }
  componentDidMount = () => {
    this.renderMap()
  }
  addMarker = () => {
    if (this.map) {
      const el = document.createElement('div')
      el.style.width = '20px'
      el.style.height = '20px'
      el.style.borderRadius = '50%'
      el.style.backgroundColor = 'green'
      const marker = new window.mapabcgl.Marker(el)
        .setLngLat([116.391, 39.911])
        .addTo(this.map);
    }
  }
  renderMap = () => {
    mapConfiger.zoom = 11
    const map = new window.mapabcgl.Map(mapConfiger)
    map.addControl(new window.mapabcgl.NavigationControl());
    const options = {
      minzoom: 1, // 路况显示的最小级别(1-24)
      maxzoom: 24, // 路况显示的最大级别(1-24)
      type: 'vector', // 路况图层类型:vector(矢量),raster(栅格)
      refresh: 30 * 1000, // 路况图层刷新时间，毫秒
      // before:'roads-symbol-49'
    };
    map.on('load', () => {
      map.trafficLayer(true, options);
      this.addMarker()
    })
    this.map = map
  }
  render() {
    const { mainHomePage } = this.state
    return (
      <div className={styles.PlancontrolPageWrapper}>
        <div className={styles.sidebarLeft}>
          <div>
            <span>活动</span>
            <span>应急</span>
          </div>
          <Menu
            onClick={this.handleClick}
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
          >
            <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
              <SubMenu key="sub3" title="Submenu">
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item>
              </SubMenu>
            </SubMenu>
          </Menu>
        </div>
        <div className={styles.container}>
          {
            !mainHomePage &&
            <div className={styles.contentCenter}>
              <div id="mapContainer" className="map-container" style={{ height: 'calc(100% - 5px)' }}></div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default Homepage
