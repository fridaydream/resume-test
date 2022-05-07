import React, { useState } from 'react'
import { debounce } from 'lodash'
import axios from 'axios'
import { UserInfo } from './types'
import './Search.css'
function Search() {
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo)
  const [loadding, setLoadding] = useState<Boolean>(false)
  const fetchAjax = async (value: string) => {
    setLoadding(true)
    const result = await axios.post(`https://api.uomg.com/api/qq.info?qq=${value}`, {
      qq: value
    })
    setLoadding(false)
    debugger
    setUserInfo(result.data)
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    var qqReg=/^[1-9]\d{4,10}$/;
    // 前端拦截校验
    if (!qqReg.test(value)) {
      setUserInfo({msg: 'qq号格式不对'} as UserInfo)
      return
    }
    fetchAjax(value);
  };
  return (
    <>
      <div>
        QQ
        <input onChange={debounce(handleChange, 800)} className="input" />
      </div>
      {
        loadding ?
          'loadding...' : userInfo.code === 1 ?
          (
            <div className='user'>
              <div className='user-logo'>
                <img src={userInfo.qlogo} alt="" />
              </div>
              <div className='user-message'>
                <p>{userInfo.name}</p>
                <p>{userInfo.qq}</p>
              </div>
            </div>
          ) : 
          <div>
            {
              userInfo.msg
            }
          </div>
      }
    </>
  )
}

export default Search;