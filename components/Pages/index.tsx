import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';
import { ColorType } from '../Libs/LightweightChart/types';
import { url } from 'inspector';


export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles
  let name = "Weather Forecast"
  

  return (
    <div style={{ direction: "ltr", minHeight: "11vh",}}>
      <br-x />
      <Window title={name} style={{ minHeight:500,width:700,backgroundColor:"#F9FBFD", backgroundRepeat:'no-repeat',backgroundSize:"cover",position:"absolute" ,left:100}}>
        {/* <pre style={{ direction:"ltr"}}>{JSON.stringify(props.data.current_condition[0].FeelsLikeC, null, 2)}</pre> */}
      <div><img style={{height:530,width:700}} src="/weather3.jpg"/></div>
          <div style={{width: "60%", height:350,backgroundColor:"#7BC5E5",opacity:0.5, position:'absolute', left:60, bottom:80, top:80,borderRadius:10, textAlign:"left",padding:60,
          fontFamily:'Times New Roman',fontSize:15,color:"rgb(5 16 25)0 34)" 
          }}>
          

            <img style={{opacity:1,width:30,height:27}} src="/icon1.jpg" /> <span>Weather FeelsLike(in centigrade): {props.feelslikec} °c</span>
            <br-x/>
            <br-x/>
            <img style={{opacity:1,width:30,height:27}} src="/icon2.jpg" /> <span>Weather FeelsLike(in fahrenheit): {props.feelslikef} °F </span>
            <br-x/>
            <br-x/>
            <img style={{opacity:1,width:24,height:20}} src="/icon5.jpg" />  <span>Humidity Level: {props.humidity} %</span>
            <br-x/>
            <br-x/>
            <img style={{opacity:1,width:26,height:25}} src="/icon9.jpg" />  <span> UV-Level: {props.uvindex}</span>
            <br-x/>
            <br-x/>
            <img style={{width:28,height:25}} src="/icone2.jpg" />  <span> Windspeed(Km/H): {props.windspeedkmph}</span>
            <br-x/>
            <br-x/>
            <img style={{width:28,height:25}} src="/icone3.jpg" />  <span>Sunrise: {props.sunrise}</span>
            <br-x/>
            <img style={{width:28,height:25}} src="/icone4.jpg" />  <span>Sunset: {props.sunset}</span>
          </div>

          <center style={{fontSize:15, fontFamily:'Dana',color:"#487BAD"}}>
            تهیه شده توسط تیم پژوهشی تورینگ
          </center>
      </Window>
    </div>
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;

    let data = await (await fetch("https://irmapserver.ir/research/api/weather/")).json()
    let feelslikec = data.current_condition[0].FeelsLikeC
    let feelslikef = data.current_condition[0].FeelsLikeF
    let humidity = data.current_condition[0].humidity
    let uvindex = data.current_condition[0].uvIndex
    let windspeedkmph = data.current_condition[0].windspeedKmph
    let sunrise = data.weather[0].astronomy[0].sunrise 
    let sunset = data.weather[0].astronomy[0].sunset
    console.log(data)

  return {
    props: {
      data: global.QSON.stringify({
        session,
        feelslikec,
        feelslikef,
        humidity,
        uvindex,
        windspeedkmph,
        sunrise,
        sunset,
        // nlangs,
      })
    },
  }
}