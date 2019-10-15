import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Input, Card, Carousel } from 'antd';
import { Bar } from '@/components/Charts';

@connect()
class SearchList extends Component {
  handleFormSubmit = value => {
    // eslint-disable-next-line
    console.log(value);
  };

  render() {
    const salesData = [];
    for (let i = 0; i < 12; i += 1) {
      salesData.push({
        x: `${i + 1}月`,
        y: Math.floor(Math.random() * 1000) + 200,
      });
    }
    return (
      <Card>
        <Bar height={200} title="销售额趋势" data={salesData} />
        <div>
          <Carousel dotPosition="top" autoplay>
            <div>
              <img src={require('@/assets/notice1.jpg')} alt="" style={{ width: '300px' }} />
            </div>
            <div>
              <img src={require('@/assets/notice2.jpg')} alt="" style={{ width: '300px' }} />
            </div>
          </Carousel>
        </div>
      </Card>
    );
  }
}

export default SearchList;
