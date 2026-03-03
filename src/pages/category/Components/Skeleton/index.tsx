import { Image, Navigator, ScrollView, Text, View } from '@tarojs/components';
import React from 'react';
import './index.scss'; // 引入样式文件

const Skeleton: React.FC = () => {
  return (
    // 添加 category-skeleton 作为命名空间，避免样式冲突
    <View className='category-skeleton sk-container'>
      <View className='index-module__tr-layout___QqX8h'>
        {/* 导航栏 */}
        <View
          className='nut-navbar'
          style='--nutui-navbar-height: 66px; padding-top: 14px; background: transparent; background-color: #57bea0; z-index: 10;'
        >
          <View className='nut-navbar-left nut-navbar-left-hidden'></View>
          <View className='nut-navbar-title sk-transparent sk-text-14-2857-414 sk-text'>商品分类</View>
          <View className='nut-navbar-right'></View>
        </View>

        {/* 头部搜索区域 */}
        <View
          className='index-module__tr-layout-header___bat5V'
          style='padding: 0 0 10px 0; background-color: #57bea0;'
        >
          <View>
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
                    男鞋
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
              </View>
            </View>
          </View>
        </View>

        {/* 主体区域：左右分类 */}
        <View
          className='index-module__tr-layout-body___vONfk'
          style='padding: 0px;'
        >
          <View
            className='nut-tabs nut-tabs-vertical'
            style='height: 100%;'
          >
            {/* 左侧分类列表 */}
            <ScrollView
              className='nut-tabs-titles nut-tabs-titles-line'
              scrollY
              enhanced
              showScrollbar={false}
              style={{ height: '100%' }}
            >
              <View className='nut-tabs-list'>
                <View className='nut-tabs-titles-item nut-tabs-titles-item-active'>
                  <View className='nut-tabs-titles-item-line nut-tabs-titles-item-line-vertical sk-image'></View>
                  <View className='nut-tabs-ellipsis nut-tabs-titles-item-text sk-transparent sk-text-0-0000-51 sk-text'>
                    居家
                  </View>
                </View>
                <View className='nut-tabs-titles-item'>
                  <View className='nut-tabs-titles-item-line nut-tabs-titles-item-line-vertical'></View>
                  <View className='nut-tabs-ellipsis nut-tabs-titles-item-text sk-transparent sk-text-0-0000-28 sk-text'>
                    美食
                  </View>
                </View>
                <View className='nut-tabs-titles-item'>
                  <View className='nut-tabs-titles-item-line nut-tabs-titles-item-line-vertical'></View>
                  <View className='nut-tabs-ellipsis nut-tabs-titles-item-text sk-transparent sk-text-0-0000-62 sk-text'>
                    服饰
                  </View>
                </View>
                <View className='nut-tabs-titles-item'>
                  <View className='nut-tabs-titles-item-line nut-tabs-titles-item-line-vertical'></View>
                  <View className='nut-tabs-ellipsis nut-tabs-titles-item-text sk-transparent sk-text-0-0000-599 sk-text'>
                    母婴
                  </View>
                </View>
                <View className='nut-tabs-titles-item'>
                  <View className='nut-tabs-titles-item-line nut-tabs-titles-item-line-vertical'></View>
                  <View className='nut-tabs-ellipsis nut-tabs-titles-item-text sk-transparent sk-text-0-0000-83 sk-text'>
                    个护
                  </View>
                </View>
                <View className='nut-tabs-titles-item'>
                  <View className='nut-tabs-titles-item-line nut-tabs-titles-item-line-vertical'></View>
                  <View className='nut-tabs-ellipsis nut-tabs-titles-item-text sk-transparent sk-text-0-0000-911 sk-text'>
                    严选
                  </View>
                </View>
                <View className='nut-tabs-titles-item'>
                  <View className='nut-tabs-titles-item-line nut-tabs-titles-item-line-vertical'></View>
                  <View className='nut-tabs-ellipsis nut-tabs-titles-item-text sk-transparent sk-text-0-0000-797 sk-text'>
                    数码
                  </View>
                </View>
                <View className='nut-tabs-titles-item'>
                  <View className='nut-tabs-titles-item-line nut-tabs-titles-item-line-vertical'></View>
                  <View className='nut-tabs-ellipsis nut-tabs-titles-item-text sk-transparent sk-text-0-0000-722 sk-text'>
                    运动
                  </View>
                </View>
                <View className='nut-tabs-titles-item'>
                  <View className='nut-tabs-titles-item-line nut-tabs-titles-item-line-vertical'></View>
                  <View className='nut-tabs-ellipsis nut-tabs-titles-item-text sk-transparent sk-text-0-0000-667 sk-text'>
                    杂项
                  </View>
                </View>
              </View>
            </ScrollView>

            {/* 右侧内容区域 */}
            <View className='nut-tabs-content-wrap'>
              <View
                className='nut-tabs-content'
                style='transform: translate3d( 0, -0%, 0); transition-duration: 300ms;'
              >
                {/* 第一个分类内容 */}
                <View className='nut-tabpane active'>
                  {/* 居家生活用品 */}
                  <View>
                    <View className='index-module__title___mgE1E'>
                      <Text className='index-module__name___uKUM8 sk-transparent sk-text-31-6667-660 sk-text'>
                        居家生活用品
                      </Text>
                      <Navigator
                        className='index-module__more___NSYRI sk-transparent sk-text-30-0000-476 sk-text sk-pseudo sk-pseudo-circle'
                        openType='navigate'
                      >
                        全部
                      </Navigator>
                    </View>
                    <View className='index-module__section___V9nd7'>
                      {/* 商品1 */}
                      <View
                        className='nut-grid-item'
                        style='width: calc(33.333333333333336% - 6px); overflow: hidden; padding-top: calc(33.333333333333336% - 6px);'
                      >
                        <View className='nut-grid-item-content nut-grid-item-content-border nut-grid-item-content-surround nut-grid-item-content-center nut-grid-item-content-square nut-grid-item-content-vertical'>
                          <View
                            className='nut-image nut-image-basic'
                            style='width: 60px; height: 60px;'
                          >
                            <Image
                              className='nut-image-default sk-image'
                              mode='scaleToFill'
                              src=''
                            />
                          </View>
                          <View className='nut-grid-item-text'>
                            <View className='index-module__name___uKUM8 ellipsis sk-transparent sk-text-14-2857-351 sk-text'>
                              钻石陶瓷涂层多用锅18cm 小奶锅
                            </View>
                            <View className='index-module__price___r4O_s'>
                              <Text className='sk-transparent sk-opacity'>¥</Text>
                              <Text className='index-module__number___zyZOn sk-transparent sk-text-14-2857-502 sk-text'>
                                149.00
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      {/* 商品2 */}
                      <View
                        className='nut-grid-item'
                        style='width: calc(33.333333333333336% - 6px); overflow: hidden; padding-top: calc(33.333333333333336% - 6px);'
                      >
                        <View className='nut-grid-item-content nut-grid-item-content-border nut-grid-item-content-surround nut-grid-item-content-center nut-grid-item-content-square nut-grid-item-content-vertical'>
                          <View
                            className='nut-image nut-image-basic'
                            style='width: 60px; height: 60px;'
                          >
                            <Image
                              className='nut-image-default sk-image'
                              mode='scaleToFill'
                              src=''
                            />
                          </View>
                          <View className='nut-grid-item-text'>
                            <View className='index-module__name___uKUM8 ellipsis sk-transparent sk-text-14-2857-62 sk-text'>
                              极光限定 珠光蓝珐琅锅
                            </View>
                            <View className='index-module__price___r4O_s'>
                              <Text className='sk-transparent sk-opacity'>¥</Text>
                              <Text className='index-module__number___zyZOn sk-transparent sk-text-14-2857-529 sk-text'>
                                199.00
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* 收纳分类 */}
                  <View>
                    <View className='index-module__title___mgE1E'>
                      <Text className='index-module__name___uKUM8 sk-transparent sk-text-31-6667-482 sk-text'>
                        收纳
                      </Text>
                      <Navigator
                        className='index-module__more___NSYRI sk-transparent sk-text-30-0000-115 sk-text sk-pseudo sk-pseudo-circle'
                        openType='navigate'
                      >
                        全部
                      </Navigator>
                    </View>
                    <View className='index-module__section___V9nd7'>
                      {/* 商品1 */}
                      <View
                        className='nut-grid-item'
                        style='width: calc(33.333333333333336% - 6px); overflow: hidden; padding-top: calc(33.333333333333336% - 6px);'
                      >
                        <View className='nut-grid-item-content nut-grid-item-content-border nut-grid-item-content-surround nut-grid-item-content-center nut-grid-item-content-square nut-grid-item-content-vertical'>
                          <View
                            className='nut-image nut-image-basic'
                            style='width: 60px; height: 60px;'
                          >
                            <Image
                              className='nut-image-default sk-image'
                              mode='scaleToFill'
                              src=''
                            />
                          </View>
                          <View className='nut-grid-item-text'>
                            <View className='index-module__name___uKUM8 ellipsis sk-transparent sk-text-14-2857-41 sk-text'>
                              给衣柜减减肥，真空防潮压缩袋
                            </View>
                            <View className='index-module__price___r4O_s'>
                              <Text className='sk-transparent sk-opacity'>¥</Text>
                              <Text className='index-module__number___zyZOn sk-transparent sk-text-14-2857-956 sk-text'>
                                79.00
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      {/* 商品2 */}
                      <View
                        className='nut-grid-item'
                        style='width: calc(33.333333333333336% - 6px); overflow: hidden; padding-top: calc(33.333333333333336% - 6px);'
                      >
                        <View className='nut-grid-item-content nut-grid-item-content-border nut-grid-item-content-surround nut-grid-item-content-center nut-grid-item-content-square nut-grid-item-content-vertical'>
                          <View
                            className='nut-image nut-image-basic'
                            style='width: 60px; height: 60px;'
                          >
                            <Image
                              className='nut-image-default sk-image'
                              mode='scaleToFill'
                              src=''
                            />
                          </View>
                          <View className='nut-grid-item-text'>
                            <View className='index-module__name___uKUM8 ellipsis sk-transparent sk-text-14-2857-254 sk-text'>
                              爆款明星好物，抽屉式透明储物柜
                            </View>
                            <View className='index-module__price___r4O_s'>
                              <Text className='sk-transparent sk-opacity'>¥</Text>
                              <Text className='index-module__number___zyZOn sk-transparent sk-text-14-2857-450 sk-text'>
                                129.00
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      {/* 商品3 */}
                      <View
                        className='nut-grid-item'
                        style='width: calc(33.333333333333336% - 6px); overflow: hidden; padding-top: calc(33.333333333333336% - 6px);'
                      >
                        <View className='nut-grid-item-content nut-grid-item-content-border nut-grid-item-content-surround nut-grid-item-content-center nut-grid-item-content-square nut-grid-item-content-vertical'>
                          <View
                            className='nut-image nut-image-basic'
                            style='width: 60px; height: 60px;'
                          >
                            <Image
                              className='nut-image-default sk-image'
                              mode='scaleToFill'
                              src=''
                            />
                          </View>
                          <View className='nut-grid-item-text'>
                            <View className='index-module__name___uKUM8 ellipsis sk-transparent sk-text-14-2857-92 sk-text'>
                              衣柜省空间神器，棉麻涤·收纳挂袋
                            </View>
                            <View className='index-module__price___r4O_s'>
                              <Text className='sk-transparent sk-opacity'>¥</Text>
                              <Text className='index-module__number___zyZOn sk-transparent sk-text-14-2857-901 sk-text'>
                                55.00
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      {/* 商品4 */}
                      <View
                        className='nut-grid-item'
                        style='width: calc(33.333333333333336% - 6px); overflow: hidden; padding-top: calc(33.333333333333336% - 6px);'
                      >
                        <View className='nut-grid-item-content nut-grid-item-content-border nut-grid-item-content-surround nut-grid-item-content-center nut-grid-item-content-square nut-grid-item-content-vertical'>
                          <View
                            className='nut-image nut-image-basic'
                            style='width: 60px; height: 60px;'
                          >
                            <Image
                              className='nut-image-default sk-image'
                              mode='scaleToFill'
                              src=''
                            />
                          </View>
                          <View className='nut-grid-item-text'>
                            <View className='index-module__name___uKUM8 ellipsis sk-transparent sk-text-14-2857-868 sk-text'>
                              换季好帮手，大容量防尘衣物收纳袋
                            </View>
                          </View>
                        </View>
                      </View>
                      {/* 商品5 */}
                      <View
                        className='nut-grid-item'
                        style='width: calc(33.333333333333336% - 6px); overflow: hidden; padding-top: calc(33.333333333333336% - 6px);'
                      >
                        <View className='nut-grid-item-content nut-grid-item-content-border nut-grid-item-content-surround nut-grid-item-content-center nut-grid-item-content-square nut-grid-item-content-vertical'>
                          <View
                            className='nut-image nut-image-basic'
                            style='width: 60px; height: 60px;'
                          >
                            <Image
                              className='nut-image-default sk-image'
                              mode='scaleToFill'
                              src=''
                            />
                          </View>
                          <View className='nut-grid-item-text'>
                            <View className='index-module__name___uKUM8 ellipsis sk-transparent sk-text-14-2857-611 sk-text'>
                              可水洗的布艺收纳盒
                            </View>
                          </View>
                        </View>
                      </View>
                      {/* 商品6 */}
                      <View
                        className='nut-grid-item'
                        style='width: calc(33.333333333333336% - 6px); overflow: hidden; padding-top: calc(33.333333333333336% - 6px);'
                      >
                        <View className='nut-grid-item-content nut-grid-item-content-border nut-grid-item-content-surround nut-grid-item-content-center nut-grid-item-content-square nut-grid-item-content-vertical'>
                          <View
                            className='nut-image nut-image-basic'
                            style='width: 60px; height: 60px;'
                          >
                            <Image
                              className='nut-image-default sk-image'
                              mode='scaleToFill'
                              src=''
                            />
                          </View>
                          <View className='nut-grid-item-text'>
                            <View className='index-module__name___uKUM8 ellipsis sk-transparent sk-text-14-2857-668 sk-text'>
                              开发员自留款，带滚轮双层脏衣篓
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Skeleton;
