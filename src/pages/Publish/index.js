import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select,
    message
  } from 'antd'
  import { PlusOutlined } from '@ant-design/icons'
  import { Link, useNavigate, useSearchParams } from 'react-router-dom'
  import { observer } from 'mobx-react-lite'
  import './index.scss'
  import ReactQuill from 'react-quill'
  import 'react-quill/dist/quill.snow.css'
  import { useStore } from '@/store'
  import { useEffect, useRef, useState } from 'react'
  import { http } from '@/utils'
  const { Option } = Select
  const Publish = () => {
    const { channelStore } = useStore() // 渲染频道列表下拉框
  
    // 存放上传图片的列表
    const [fileList, setFileList] = useState([])
    // Upload-onChange这个函数的执行分阶段 是status从uploading到done的过程
    // 这个过程只要上传图片内容发生变化就会不断执行直到全部上传完毕
    // 使用useRef声明一个暂存仓库！！！让用户上传的图片一直在内存中
    const cacheImgList = useRef([])
    const onUploadChange = ({ fileList }) => {
      // 同时把图片列表存入仓库一份
      // 这里关键位置:需要做数据格式化
      const formatList = fileList.map(file => {
        // 上传完毕 做数据处理
        if (file.response) {
          return {
            url: file.response.data.url
          }
        }
        // 否则在上传中时，不做处理
        return file
      })
      setFileList(formatList)
      cacheImgList.current = formatList
    }
  
    // 切换图片
    const [imgCount, setImageCount] = useState(1) // 控制最大上传图片数量 + 是否支持多传
    const radioChange = (e) => {
      // 这里要使用e.target.value做判断
      // 天坑：imgCount和rawValue分别是useState方法更新后的数量 / 原始数量！！！
      // useState修改之后的数据  无法同步获取修改之后的新值
      const rawValue = e.target.value 
      setImageCount(rawValue)
      /**
       * 这里需要处理fileList的原因：
       * cover图片的数量在单图和三图之间做切换
       * 三图 -> 单图：原本的3张图不应该被干掉，防止切回三图
       * 同时，显示三图中的一张图即可
       */
      // 无图模式  
      if (cacheImgList.current.length === 0) {
        return false
      }
      // 点击切换到单图模式
      if (rawValue === 1) {
        const img = cacheImgList.current[0]
        setFileList([img])
        // 点击切换到多图模式
      } else if (rawValue === 3) {
        setFileList(cacheImgList.current)
      }
    }
  
    // 提交表单
    const navigate = useNavigate()
    const onFinish = async (values) => {
      // 数据的二次处理 重点是处理cover字段
      const { channel_id, content, title, type } = values
      // 判断type fileList 是匹配的才能正常提交
      console.log(fileList);
      const params = {
        channel_id,
        content,
        title,
        type,
        cover: {
          type: type,
          images: fileList.map(item => item.url)
        }
      }
      if (id) {
        await http.put(`/mp/articles/${id}?draft=false`, params)
      } else {
        await http.post('/mp/articles?draft=false', params)
      }
  
      // 跳转列表 提示用户
      navigate('/article')
      message.success(`${id ? '更新成功' : '发布成功'}`)
    }
  
    // 编辑功能
    // 文案适配  路由参数id 判断条件
    const [params] = useSearchParams()
    const id = params.get('id')
    // 数据回填  id调用接口  1.表单回填 2.暂存列表 3.Upload组件fileList
    const [form] = Form.useForm()
    useEffect(() => {
        // 获取当前文章的具体细节内容进行修改
        const loadDetail = async () => {
        const res = await http.get(`/mp/articles/${id}`)
        const data = res.data
        console.log(data);
        // 表单数据回填
        form.setFieldsValue({ ...data, type: data.cover.type })
        // 回填upload
        const formatImgList = data.cover.images.map(url => ({ url }))
        setFileList(formatImgList)
        // 暂存列表里也存一份 
        cacheImgList.current = formatImgList
        // 图片type
        setImageCount(data.cover.type)
      }
      // 必须是编辑状态 才可以发送请求
      if (id) { // 编辑状态
        loadDetail()
      } else { // 放弃编辑跳到发布状态需要把之前的details全部干掉
        const _data = {
          title: '', // 标题
          channel_id: null, // 频道
          content: '', // 富文本
        }
        form.setFieldsValue({ ..._data })
        setFileList([])
        cacheImgList.current = []
        setImageCount(1)
      }
    }, [id, form])
  
    return (
      <div className="publish">
        <Card
          title={
            <Breadcrumb separator=">">
              <Breadcrumb.Item>
                <Link to="/home">首页</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{id ? '编辑' : '发布'}文章</Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ type: 1, content: '' }}
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
              label="标题"
              name="title"
              rules={[{ required: true, message: '请输入文章标题' }]}
            >
              <Input placeholder="请输入文章标题" style={{ width: 400 }} defaultValue=""/>
            </Form.Item>
            <Form.Item
              label="频道"
              name="channel_id"
              rules={[{ required: true, message: '请选择文章频道' }]}
            >
              <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                {channelStore.channelList.map(item => (
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                ))}
  
              </Select>
            </Form.Item>
  
            <Form.Item label="封面">
              <Form.Item name="type">
                <Radio.Group onChange={radioChange}>
                  <Radio value={1}>单图</Radio>
                  <Radio value={3}>三图</Radio>
                  <Radio value={0}>无图</Radio>
                </Radio.Group>
              </Form.Item>
              {imgCount > 0 && (
                <Upload
                  name="image"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList
                  action="http://geek.itheima.net/v1_0/upload"
                  fileList={fileList}
                  onChange={onUploadChange}
                  multiple={imgCount > 1} // 3代表支持多传，1代表只可以上传一张图片
                  maxCount={imgCount}
                >
                  <div style={{ marginTop: 8 }}>
                    <PlusOutlined />
                  </div>
                </Upload>
              )}
  
            </Form.Item>
            {/* 这里的富文本组件 已经被Form.Item控制 */}
            {/* 它的输入内容 会在onFinished回调中收集起来 */}
            <Form.Item
              label="内容"
              name="content"
              rules={[{ required: true, message: '请输入文章内容' }]}
            >
              <ReactQuill theme="snow" />
            </Form.Item>
  
            <Form.Item wrapperCol={{ offset: 4 }}>
              <Space>
                <Button size="large" type="primary" htmlType="submit">
                  {id ? '更新' : '发布'}文章
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
  
  export default observer(Publish)