import React from 'react';
import { View, Text, Swiper, SwiperItem, ScrollView, Navigator, Image } from '@tarojs/components';
import './index.scss'; // 引入普通样式文件

const Skeleton: React.FC = () => {
  return (
    <View className='page-index-skeleton sk-container'>
      <View className='index-module__tr-layout___QqX8h'>
        {/* 导航栏 */}
        <View
          className='nut-navbar'
          style='--nutui-navbar-height: 66px; padding-top: 14px; background: transparent; background-color: #57bea0; z-index: 10;'
        >
          <View className='nut-navbar-left nut-navbar-left-hidden'></View>
          <View className='nut-navbar-title'>
            <View className='index-module__nav-bar___P95L9'>
              <View className='index-module__logo___uQ6c2'>
                <Image
                  className='index-module__logo-image___ptR2Y sk-image'
                  mode='scaleToFill'
                  src=''
                />
                <Text className='index-module__logo-text___OCJnT sk-transparent sk-text-3-5714-212 sk-text'>
                  新鲜 · 亲民 · 快捷
                </Text>
              </View>
            </View>
          </View>
          <View className='nut-navbar-right'></View>
        </View>

        {/* 头部区域 */}
        <View
          className='index-module__tr-layout-header___bat5V'
          style='padding: 0px;'
        >
          {/* 搜索栏 */}
          <View className='index-module__search___Qp2FE'>
            <View
              className='nut-searchbar'
              style='--nutui-searchbar-background: transparent; --nutui-searchbar-content-background: #eee;'
            >
              <View className='nut-searchbar-content nut-searchbar-round'>
                <View className='nut-searchbar-leftin nut-searchbar-icon'>
                  <Text
                    className='h5-i nut-icon nut-icon-Search'
                    style="background-color: currentColor; mask: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0OCA0OCI+PGcgZmlsbD0iIzE3MWEyNiIgZmlsbC1ydWxlPSJOT05aRVJPIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6cGFzcy10aHJvdWdoO29wYWNpdHk6MSI+PHBhdGggZD0iTTQwIDIwYzAgMTEuMDQ2LTguOTU0IDIwLTIwIDIwUzAgMzEuMDQ2IDAgMjAgOC45NTQgMCAyMCAwczIwIDguOTU0IDIwIDIwbS0zIDBjMC05LjM4OS03LjYxMS0xNy0xNy0xN1MzIDEwLjYxMSAzIDIwczcuNjExIDE3IDE3IDE3IDE3LTcuNjExIDE3LTE3TTQzLjg1NCA0My4xNDZhMSAxIDAgMCAwIDAtMS40MTRsLTUuNTg2LTUuNTg2YTEgMSAwIDAgMC0xLjQxNCAwbC0uNzA4LjcwOGExIDEgMCAwIDAgMCAxLjQxNGw1LjU4NiA1LjU4NmExIDEgMCAwIDAgMS40MTQgMHoiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTpub3JtYWwiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIgMikiLz48L2c+PC9zdmc+') 0 0/100% 100% no-repeat; -webkit-mask: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0OCA0OCI+PGcgZmlsbD0iIzE3MWEyNiIgZmlsbC1ydWxlPSJOT05aRVJPIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6cGFzcy10aHJvdWdoO29wYWNpdHk6MSI+PHBhdGggZD0iTTQwIDIwYzAgMTEuMDQ2LTguOTU0IDIwLTIwIDIwUzAgMzEuMDQ2IDAgMjAgOC45NTQgMCAyMCAwczIwIDguOTU0IDIwIDIwbS0zIDBjMC05LjM4OS03LjYxMS0xNy0xNy0xN1MzIDEwLjYxMSAzIDIwczcuNjExIDE3IDE3IDE3IDE3LTcuNjExIDE3LTE3TTQzLjg1NCA0My4xNDZhMSAxIDAgMCAwIDAtMS40MTRsLTUuNTg2LTUuNTg2YTEgMSAwIDAgMC0xLjQxNCAwbC0uNzA4LjcwOGExIDEgMCAwIDAgMCAxLjQxNGw1LjU4NiA1LjU4NmExIDEgMCAwIDAgMS40MTQgMHoiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTpub3JtYWwiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIgMikiLz48L2c+PC9zdmc+') 0 0/100% 100% no-repeat;"
                  ></Text>
                </View>
                <View className='nut-searchbar-input-box'>
                  <View
                    className='h5-input nut-searchbar-input sk-image'
                    placeholder-class='input-placeholder'
                  >
                    搜索商品
                  </View>
                </View>
                <View
                  className='h5-view nut-searchbar-clear nut-searchbar-icon sk-pseudo sk-pseudo-circle'
                  style='visibility: hidden;'
                >
                  <Text
                    className='h5-i nut-icon nut-icon-MaskClose'
                    style="background-color: currentColor; mask: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCI+PHBhdGggZmlsbD0iIzMzMyIgZD0iTTI0IC43QzExLjE4LjcuNyAxMS4xOC43IDI0UzExLjE4IDQ3LjMgMjQgNDcuMyA0Ny4zIDM2LjgyIDQ3LjMgMjQgMzYuODIuNyAyNCAuN205LjcxIDMwLjI4Yy43OC43OC43OCAxLjk0IDAgMi43MnMtMS45NC43OC0yLjcyIDBMMjQgMjYuNzFsLTYuOTkgNi45OWMtLjc4Ljc4LTEuOTQuNzgtMi43MiAwcy0uNzgtMS45NCAwLTIuNzJsNi45OS02Ljk5TDE0LjI5IDE3Yy0uNzgtLjc4LS43OC0xLjk0IDAtMi43MnMxLjk0LS43OCAyLjcyIDBMMjQgMjEuMjdsNi45OS02Ljk5Yy43OC0uNzggMS45NC0uNzggMi43MiAwcy43OCAxLjk0IDAgMi43MmwtNi45OSA2Ljk5eiIvPjwvc3ZnPg==') 0 0/100% 100% no-repeat; -webkit-mask: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCI+PHBhdGggZmlsbD0iIzMzMyIgZD0iTTI0IC43QzExLjE4LjcuNyAxMS4xOC43IDI0UzExLjE4IDQ3LjMgMjQgNDcuMyA0Ny4zIDM2LjgyIDQ3LjMgMjQgMzYuODIuNyAyNCAuN205LjcxIDMwLjI4Yy43OC43OC43OCAxLjk0IDAgMi43MnMtMS45NC43OC0yLjcyIDBMMjQgMjYuNzFsLTYuOTkgNi45OWMtLjc4Ljc4LTEuOTQuNzgtMi43MiAwcy0uNzgtMS45NCAwLTIuNzJsNi45OS02Ljk5TDE0LjI5IDE3Yy0uNzgtLjc4LS43OC0xLjk0IDAtMi43MnMxLjk0LS43OCAyLjcyIDBMMjQgMjEuMjdsNi45OS02Ljk5Yy43OC0uNzggMS45NC0uNzggMi43MiAwcy43OCAxLjk0IDAgMi43MmwtNi45OSA2Ljk5eiIvPjwvc3ZnPg==') 0 0/100% 100% no-repeat;"
                  ></Text>
                </View>
                <View className='nut-searchbar-rightin nut-searchbar-icon'>
                  <Text
                    className='h5-i nut-icon nut-icon-Scan'
                    style="background-color: #888B94; mask: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0OCA0OCI+PGcgZmlsbD0iIzE3MWEyNiIgZmlsbC1ydWxlPSJOT05aRVJPIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6cGFzcy10aHJvdWdoO29wYWNpdHk6MSI+PHBhdGggZD0iTTEwIDNoNS41YTEgMSAwIDAgMCAxLTFWMWExIDEgMCAwIDAtMS0xSDEwYTggOCAwIDAgMC04IDh2NS41YTEgMSAwIDAgMCAxIDFoMWExIDEgMCAwIDAgMS0xVjhhNSA1IDAgMCAxIDUtNU0xMCA0MWg1LjVhMSAxIDAgMCAxIDEgMXYxYTEgMSAwIDAgMS0xIDFIMTBhOCA4IDAgMCAxLTgtOHYtNS41YTEgMSAwIDAgMSAxLTFoMWExIDEgMCAwIDEgMSAxVjM2YTUgNSAwIDAgMCA1IDVNMzggNDRoLTUuNWExIDEgMCAwIDEtMS0xdi0xYTEgMSAwIDAgMSAxLTFIMzhhNSA1IDAgMCAwIDUtNXYtNS41YTEgMSAwIDAgMSAxLTFoMWExIDEgMCAwIDEgMSAxVjM2YTggOCAwIDAgMS04IDhNMzIuNSAwYTEgMSAwIDAgMC0xIDF2MWExIDEgMCAwIDAgMSAxSDM4YTUgNSAwIDAgMSA1IDV2NS41YTEgMSAwIDAgMCAxIDFoMWExIDEgMCAwIDAgMS0xVjhhOCA4IDAgMCAwLTgtOHpNMCAyMi41YTEgMSAwIDAgMCAxIDFoNDZhMSAxIDAgMCAwIDEtMXYtMWExIDEgMCAwIDAtMS0xSDFhMSAxIDAgMCAwLTEgMXoiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTpub3JtYWwiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMikiLz48L2c+PC9zdmc+') 0 0/100% 100% no-repeat; -webkit-mask: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0OCA0OCI+PGcgZmlsbD0iIzE3MWEyNiIgZmlsbC1ydWxlPSJOT05aRVJPIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6cGFzcy10aHJvdWdoO29wYWNpdHk6MSI+PHBhdGggZD0iTTEwIDNoNS41YTEgMSAwIDAgMCAxLTFWMWExIDEgMCAwIDAtMS0xSDEwYTggOCAwIDAgMC04IDh2NS41YTEgMSAwIDAgMCAxIDFoMWExIDEgMCAwIDAgMS0xVjhhNSA1IDAgMCAxIDUtNU0xMCA0MWg1LjVhMSAxIDAgMCAxIDEgMXYxYTEgMSAwIDAgMS0xIDFIMTBhOCA4IDAgMCAxLTgtOHYtNS41YTEgMSAwIDAgMSAxLTFoMWExIDEgMCAwIDEgMSAxVjM2YTUgNSAwIDAgMCA1IDVNMzggNDRoLTUuNWExIDEgMCAwIDEtMS0xdi0xYTEgMSAwIDAgMSAxLTFIMzhhNSA1IDAgMCAwIDUtNXYtNS41YTEgMSAwIDAgMSAxLTFoMWExIDEgMCAwIDEgMSAxVjM2YTggOCAwIDAgMS04IDhNMzIuNSAwYTEgMSAwIDAgMC0xIDF2MWExIDEgMCAwIDAgMSAxSDM4YTUgNSAwIDAgMSA1IDV2NS41YTEgMSAwIDAgMCAxIDFoMWExIDEgMCAwIDAgMS0xVjhhOCA4IDAgMCAwLTgtOHpNMCAyMi41YTEgMSAwIDAgMCAxIDFoNDZhMSAxIDAgMCAwIDEtMXYtMWExIDEgMCAwIDAtMS0xSDFhMSAxIDAgMCAwLTEgMXoiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTpub3JtYWwiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMikiLz48L2c+PC9zdmc+') 0 0/100% 100% no-repeat;"
                  ></Text>
                </View>
              </View>
            </View>
          </View>

          {/* 轮播图 */}
          <View>
            <View
              className='nut-swiper'
              style='width: 100%; height: 150px;'
            >
              <View
                className='nut-swiper-inner'
                style='width: 100%; height: 150px;'
              >
                <Swiper
                  autoplay={false}
                  current={0}
                  duration={500}
                  interval={5000}
                  style='width: 100%; height: 150px;'
                >
                  <SwiperItem>
                    <Image
                      className='sk-image'
                      mode='scaleToFill'
                      style='width: 100%; height: 100%;'
                      src=''
                    />
                  </SwiperItem>
                </Swiper>
              </View>
              <View className='nut-swiper-indicator'>
                <View className='nut-indicator'>
                  <View className='nut-indicator-dot nut-indicator-dot-0'></View>
                  <View className='nut-indicator-dot nut-indicator-dot-1'></View>
                  <View className='h5-view nut-indicator-dot nut-indicator-dot-2'></View>
                  <View className='h5-view nut-indicator-dot nut-indicator-dot-3'></View>
                  <View className='h5-view nut-indicator-dot nut-indicator-dot-4 nut-indicator-dot-active'></View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* 主体内容 */}
        <View
          className='index-module__tr-layout-body___vONfk'
          style='padding: 16px;'
        >
          <ScrollView
            className='nut-infiniteloading nut-infiniteloading-default'
            scrollY
            style='height: 100%;'
          >
            <View
              className='nut-infinite-top'
              style='height: 0px; transition: height 0.2s cubic-bezier(0.25,0.1,0.25,1);'
            >
              <View className='nut-infinite-top-tips sk-transparent sk-text-14-2857-385 sk-text'>松开刷新</View>
            </View>
            <View className='nut-infinite-container'>
              {/* 网格菜单 */}
              <View
                className='nut-grid'
                style='--nutui-grid-item-content-padding: 0px; --nutui-grid-item-text-margin: 0px;'
              >
                {/* 第一行五个 */}
                <View
                  className='nut-grid-item'
                  style='width: calc(20% - 7.2px); overflow: hidden; padding-top: calc(20% - 7.2px); margin-right: 9px;'
                >
                  <View className='nut-grid-item-content nut-grid-item-content-border nut-grid-item-content-surround nut-grid-item-content-center nut-grid-item-content-square nut-grid-item-content-vertical'>
                    <Image
                      className='sk-image'
                      mode='scaleToFill'
                      style='width: 50px; height: 50px;'
                      src=''
                    />
                    <View className='nut-grid-item-text sk-transparent sk-text-14-2857-247 sk-text'>居家</View>
                  </View>
                </View>
                <View
                  className='nut-grid-item'
                  style='width: calc(20% - 7.2px); overflow: hidden; padding-top: calc(20% - 7.2px); margin-right: 9px;'
                >
                  <View className='nut-grid-item-content nut-grid-item-content-border nut-grid-item-content-surround nut-grid-item-content-center nut-grid-item-content-square nut-grid-item-content-vertical'>
                    <Image
                      className='sk-image'
                      mode='scaleToFill'
                      style='width: 50px; height: 50px;'
                      src=''
                    />
                    <View className='nut-grid-item-text sk-transparent sk-text-14-2857-763 sk-text'>锦鲤</View>
                  </View>
                </View>
                <View
                  className='nut-grid-item'
                  style='width: calc(20% - 7.2px); overflow: hidden; padding-top: calc(20% - 7.2px); margin-right: 9px;'
                >
                  <View className='nut-grid-item-content nut-grid-item-content-border nut-grid-item-content-surround nut-grid-item-content-center nut-grid-item-content-square nut-grid-item-content-vertical'>
                    <Image
                      className='sk-image'
                      mode='scaleToFill'
                      style='width: 50px; height: 50px;'
                      src=''
                    />
                    <View className='nut-grid-item-text sk-transparent sk-text-14-2857-498 sk-text'>服饰</View>
                  </View>
                </View>
                <View
                  className='nut-grid-item'
                  style='width: calc(20% - 7.2px); overflow: hidden; padding-top: calc(20% - 7.2px); margin-right: 9px;'
                >
                  <View className='nut-grid-item-content nut-grid-item-content-border nut-grid-item-content-surround nut-grid-item-content-center nut-grid-item-content-square nut-grid-item-content-vertical'>
                    <Image
                      className='sk-image'
                      mode='scaleToFill'
                      style='width: 50px; height: 50px;'
                      src=''
                    />
                    <View className='nut-grid-item-text sk-transparent sk-text-14-2857-119 sk-text'>母婴</View>
                  </View>
                </View>
                <View
                  className='nut-grid-item'
                  style='width: calc(20% - 7.2px); overflow: hidden; padding-top: calc(20% - 7.2px);'
                >
                  <View className='nut-grid-item-content nut-grid-item-content-border nut-grid-item-content-surround nut-grid-item-content-center nut-grid-item-content-square nut-grid-item-content-vertical'>
                    <Image
                      className='sk-image'
                      mode='scaleToFill'
                      style='width: 50px; height: 50px;'
                      src=''
                    />
                    <View className='nut-grid-item-text sk-transparent sk-text-14-2857-682 sk-text'>个护</View>
                  </View>
                </View>

                {/* 第二行五个 */}
                <View
                  className='nut-grid-item'
                  style='width: calc(20% - 7.2px); overflow: hidden; padding-top: calc(20% - 7.2px); margin-right: 9px; margin-top: 9px;'
                >
                  <View className='nut-grid-item-content nut-grid-item-content-border nut-grid-item-content-surround nut-grid-item-content-center nut-grid-item-content-square nut-grid-item-content-vertical'>
                    <Image
                      className='sk-image'
                      mode='scaleToFill'
                      style='width: 50px; height: 50px;'
                      src=''
                    />
                    <View className='nut-grid-item-text sk-transparent sk-text-14-2857-643 sk-text'>严选</View>
                  </View>
                </View>
                <View
                  className='nut-grid-item'
                  style='width: calc(20% - 7.2px); overflow: hidden; padding-top: calc(20% - 7.2px); margin-right: 9px; margin-top: 9px;'
                >
                  <View className='nut-grid-item-content nut-grid-item-content-border nut-grid-item-content-surround nut-grid-item-content-center nut-grid-item-content-square nut-grid-item-content-vertical'>
                    <Image
                      className='sk-image'
                      mode='scaleToFill'
                      style='width: 50px; height: 50px;'
                      src=''
                    />
                    <View className='nut-grid-item-text sk-transparent sk-text-14-2857-917 sk-text'>数码</View>
                  </View>
                </View>
                <View
                  className='nut-grid-item'
                  style='width: calc(20% - 7.2px); overflow: hidden; padding-top: calc(20% - 7.2px); margin-right: 9px; margin-top: 9px;'
                >
                  <View className='nut-grid-item-content nut-grid-item-content-border nut-grid-item-content-surround nut-grid-item-content-center nut-grid-item-content-square nut-grid-item-content-vertical'>
                    <Image
                      className='sk-image'
                      mode='scaleToFill'
                      style='width: 50px; height: 50px;'
                      src=''
                    />
                    <View className='nut-grid-item-text sk-transparent sk-text-14-2857-352 sk-text'>运动</View>
                  </View>
                </View>
                <View
                  className='nut-grid-item'
                  style='width: calc(20% - 7.2px); overflow: hidden; padding-top: calc(20% - 7.2px); margin-right: 9px; margin-top: 9px;'
                >
                  <View className='nut-grid-item-content nut-grid-item-content-border nut-grid-item-content-surround nut-grid-item-content-center nut-grid-item-content-square nut-grid-item-content-vertical'>
                    <Image
                      className='sk-image'
                      mode='scaleToFill'
                      style='width: 50px; height: 50px;'
                      src=''
                    />
                    <View className='nut-grid-item-text sk-transparent sk-text-14-2857-750 sk-text'>杂项</View>
                  </View>
                </View>
                <View
                  className='nut-grid-item'
                  style='width: calc(20% - 7.2px); overflow: hidden; padding-top: calc(20% - 7.2px); margin-top: 9px;'
                >
                  <View className='nut-grid-item-content nut-grid-item-content-border nut-grid-item-content-surround nut-grid-item-content-center nut-grid-item-content-square nut-grid-item-content-vertical'>
                    <Image
                      className='sk-image'
                      mode='scaleToFill'
                      style='width: 50px; height: 50px;'
                      src=''
                    />
                    <View className='nut-grid-item-text sk-transparent sk-text-14-2857-414 sk-text'>品牌</View>
                  </View>
                </View>
              </View>

              {/* 热门推荐区块 */}
              <View className='index-module__hot___swbB8'>
                {/* 特惠推荐 */}
                <View className='index-module__item___Kby7N'>
                  <View className='index-module__title___guMIP'>
                    <Text className='sk-transparent sk-text-14-2857-369 sk-text'>特惠推荐</Text>
                    <Text className='index-module__title-desc___wprP0 sk-transparent sk-text-14-2857-777 sk-text'>
                      它们最实惠
                    </Text>
                  </View>
                  <Navigator
                    className='index-module__cards___J6ks2'
                    openType='navigate'
                  >
                    <Image
                      className='index-module__image___oe8mr sk-image'
                      mode='aspectFit'
                      src=''
                    />
                    <Image
                      className='index-module__image___oe8mr sk-image'
                      mode='aspectFit'
                      src=''
                    />
                  </Navigator>
                </View>

                {/* 爆款推荐 */}
                <View className='index-module__item___Kby7N'>
                  <View className='index-module__title___guMIP'>
                    <Text className='sk-transparent sk-text-14-2857-14 sk-text'>爆款推荐</Text>
                    <Text className='index-module__title-desc___wprP0 sk-transparent sk-text-14-2857-602 sk-text'>
                      它们最受欢
                    </Text>
                  </View>
                  <Navigator
                    className='index-module__cards___J6ks2'
                    openType='navigate'
                  >
                    <Image
                      className='index-module__image___oe8mr sk-image'
                      mode='aspectFit'
                      src=''
                    />
                    <Image
                      className='index-module__image___oe8mr sk-image'
                      mode='aspectFit'
                      src=''
                    />
                  </Navigator>
                </View>

                {/* 一站买全 */}
                <View className='index-module__item___Kby7N'>
                  <View className='index-module__title___guMIP'>
                    <Text className='sk-transparent sk-text-14-2857-931 sk-text'>一站买全</Text>
                    <Text className='index-module__title-desc___wprP0 sk-transparent sk-text-14-2857-114 sk-text'>
                      使用场景下
                    </Text>
                  </View>
                  <Navigator
                    className='index-module__cards___J6ks2'
                    openType='navigate'
                  >
                    <Image
                      className='index-module__image___oe8mr sk-image'
                      mode='aspectFit'
                      src=''
                    />
                    <Image
                      className='index-module__image___oe8mr sk-image'
                      mode='aspectFit'
                      src=''
                    />
                  </Navigator>
                </View>

                {/* 领券中心 */}
                <View className='index-module__item___Kby7N'>
                  <View className='index-module__title___guMIP'>
                    <Text className='sk-transparent sk-text-14-2857-628 sk-text'>领券中心</Text>
                    <Text className='index-module__title-desc___wprP0 sk-transparent sk-text-14-2857-392 sk-text'>
                      更多超值优
                    </Text>
                  </View>
                  <Navigator
                    className='index-module__cards___J6ks2'
                    openType='navigate'
                  >
                    <Image
                      className='index-module__image___oe8mr sk-image'
                      mode='aspectFit'
                      src=''
                    />
                    <Image
                      className='index-module__image___oe8mr sk-image'
                      mode='aspectFit'
                      src=''
                    />
                  </Navigator>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Skeleton;
