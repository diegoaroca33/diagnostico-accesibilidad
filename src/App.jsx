import { useState, useEffect, useRef } from "react";

const CARM_LOGO = "data:image/png;base64,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";
const ACC_LOGO = "data:image/png;base64,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";

const CENTROS = [
  {n:"IES Licenciado Cascales",m:"Murcia"},{n:"IES Alfonso X el Sabio",m:"Murcia"},
  {n:"IES Infante Don Juan Manuel",m:"Murcia"},{n:"IES Saavedra Fajardo",m:"Murcia"},
  {n:"IES Miguel de Cervantes",m:"Murcia"},{n:"IES Floridablanca",m:"Murcia"},
  {n:"IES El Carmen",m:"Murcia"},{n:"IES Ramón y Cajal",m:"Murcia"},
  {n:"IES Mariano Baquero Goyanes",m:"Murcia"},{n:"IES Miguel Espinosa",m:"Murcia"},
  {n:"IES José Planes (Espinardo)",m:"Murcia"},{n:"IES Alquibla (La Alberca)",m:"Murcia"},
  {n:"IES Aljada (Puente Tocinos)",m:"Murcia"},{n:"IES Beniaján",m:"Murcia"},
  {n:"IES Ingeniero de la Cierva (Patiño)",m:"Murcia"},{n:"IES Sangonera la Verde",m:"Murcia"},
  {n:"IES Marqués de los Vélez (El Palmar)",m:"Murcia"},{n:"IES El Palmar",m:"Murcia"},
  {n:"IES J.L. Martínez Palomo (Alquerías)",m:"Murcia"},{n:"IES Poeta Sánchez Bautista (Llano Brujas)",m:"Murcia"},
  {n:"IES La Flota",m:"Murcia"},{n:"IES Juan Carlos I (La Ñora)",m:"Murcia"},
  {n:"IES Sierra de Carrascoy (El Palmar)",m:"Murcia"},
  {n:"IES Juan Sebastián Elcano",m:"Cartagena"},{n:"IES Mediterráneo",m:"Cartagena"},
  {n:"IES Isaac Peral",m:"Cartagena"},{n:"IES Ben Arabí",m:"Cartagena"},
  {n:"IES Los Molinos",m:"Cartagena"},{n:"IES Jiménez de la Espada",m:"Cartagena"},
  {n:"IES Politécnico",m:"Cartagena"},{n:"IES Cartago Espartaria (La Palma)",m:"Cartagena"},
  {n:"IES San Isidoro (Los Dolores)",m:"Cartagena"},{n:"IES Columela",m:"Cartagena"},
  {n:"IES Pedro Peñalver (El Algar)",m:"Cartagena"},
  {n:"IES Príncipe de Asturias",m:"Lorca"},{n:"IES Ibáñez Martín",m:"Lorca"},
  {n:"IES Ros Giner",m:"Lorca"},{n:"IES San Juan Bosco",m:"Lorca"},
  {n:"IES Ramón Arcas Meca",m:"Lorca"},{n:"IES Bartolomé Pérez Casas",m:"Lorca"},
  {n:"IES Francisco Salzillo",m:"Alcantarilla"},{n:"IES Sanje",m:"Alcantarilla"},
  {n:"IES Alcántara",m:"Alcantarilla"},
  {n:"IES Eduardo Linares Lumeras",m:"Molina de Segura"},{n:"IES Francisco de Goya",m:"Molina de Segura"},
  {n:"IES Vega del Segura",m:"Molina de Segura"},{n:"IES Cañada de las Eras",m:"Molina de Segura"},
  {n:"IES Los Albares",m:"Cieza"},{n:"IES Diego Tortosa",m:"Cieza"},
  {n:"IES Rey Carlos III",m:"Águilas"},{n:"IES Alfonso Escámez",m:"Águilas"},{n:"IES Europa",m:"Águilas"},
  {n:"IES José Luis Castillo Puche",m:"Yecla"},{n:"IES Azorín",m:"Yecla"},
  {n:"IES Arzobispo Lozano",m:"Jumilla"},{n:"IES Infanta Elena",m:"Jumilla"},
  {n:"IES San Juan de la Cruz",m:"Caravaca de la Cruz"},{n:"IES Miguel de Cervantes",m:"Caravaca de la Cruz"},
  {n:"IES Prado Mayor",m:"Totana"},{n:"IES Juan de la Cierva y Codorníu",m:"Totana"},
  {n:"IES Domingo Valdivieso",m:"Mazarrón"},{n:"IES Felipe II",m:"Mazarrón"},
  {n:"IES Miguel Hernández",m:"Alhama de Murcia"},{n:"IES La Costera",m:"Alhama de Murcia"},
  {n:"IES Gerardo Molina",m:"Torre Pacheco"},{n:"IES Manuel Tárraga Escribano",m:"Torre Pacheco"},
  {n:"IES Sabina Mora (Roldán)",m:"Torre Pacheco"},
  {n:"IES Mar Menor",m:"San Javier"},{n:"IES Ruiz de Alda",m:"San Javier"},
  {n:"IES Las Salinas del Mar Menor",m:"San Pedro del Pinatar"},{n:"IES Dos Mares",m:"San Pedro del Pinatar"},
  {n:"IES Antonio Menárguez Costa",m:"Los Alcázares"},
  {n:"IES Sierra Minera",m:"La Unión"},
  {n:"IES Ricardo Ortega",m:"Fuente Álamo"},
  {n:"IES Dr. Pedro Guillén",m:"Archena"},
  {n:"IES Vega del Argos",m:"Cehegín"},
  {n:"IES D. Pedro García Aguilera",m:"Moratalla"},
  {n:"IES Ortega y Rubio",m:"Mula"},
  {n:"IES Emilio Pérez Piñero",m:"Calasparra"},
  {n:"IES Salvador Sandoval",m:"Las Torres de Cotillas"},{n:"IES La Florida",m:"Las Torres de Cotillas"},
  {n:"IES Abanilla",m:"Abanilla"},
  {n:"IES Villa de Abarán",m:"Abarán"},{n:"IES Fahuarán",m:"Abarán"},
  {n:"IES Poeta Julián Andúgar",m:"Santomera"},
  {n:"IES Ceutí",m:"Ceutí"},{n:"IES Felipe de Borbón",m:"Ceutí"},
  {n:"IES Rambla de Nogalte",m:"Puerto Lumbreras"},
  {n:"IES Santa María de los Baños",m:"Fortuna"},
  {n:"IES Valle de Leiva",m:"Blanca"},
  {n:"IES Alguazas",m:"Alguazas"},
  {n:"IES Gil de Junterón",m:"Beniel"},
  {n:"IES Librilla",m:"Librilla"},
  {n:"IES Lorquí",m:"Lorquí"},
  {n:"IES Los Cantos",m:"Bullas"},
  {n:"EI Carmen Baró",m:"Murcia"},{n:"EI Gloria Fuertes",m:"Murcia"},
  {n:"EI Elisa Hernández Gómez",m:"Murcia"},{n:"EI Ntra. Sra. de la Arrixaca",m:"Murcia"},
  {n:"EI Ntra. Sra. de Belén",m:"Murcia"},{n:"EI Puertas de Murcia",m:"Murcia"},
  {n:"EI Infanta Cristina",m:"Murcia"},{n:"EI Ángel de la Guarda",m:"Murcia"},
  {n:"EI Encarnación Verdú Campillo",m:"Alcantarilla"},{n:"EI El Lugarico",m:"Lorca"},
  {n:"EI Virgilio Valdivieso",m:"Mazarrón"},{n:"EI El Pasico",m:"Torre Pacheco"},
  {n:"EI Carmen Conde",m:"Cartagena"},{n:"EI San José",m:"Molina de Segura"},
  {n:"CEIP San Isidoro y Sta. Florentina (Defensa)",m:"Cartagena"},
  {n:"CEIP Stella Maris (Defensa)",m:"Cartagena"},
  {n:"CEIP Infanta Elena (Defensa)",m:"Águilas"},
  {n:"--- Otro centro ---",m:""}
];

const SEC_URBANO=[{id:"u1",l:"Itinerario peatonal accesible hasta el centro",nt:"TMA/851/2021 Art.5"},{id:"u2",l:"Aceras \u2265 1,80 m de ancho libre",nt:"TMA/851/2021 Art.5.2"},{id:"u3",l:"Pendiente longitudinal \u2264 6%",nt:"TMA/851/2021 Art.5.4"},{id:"u4",l:"Pendiente transversal \u2264 2%",nt:"TMA/851/2021 Art.5.5"},{id:"u5",l:"Vados peatonales con pavimento táctil",nt:"TMA/851/2021 Art.20-21"},{id:"u6",l:"Parada bus accesible \u2264 300m",nt:""},{id:"u7",l:"Espacio maniobra autobús escolar",nt:""},{id:"u8",l:"Plaza PMR señalizada cerca acceso",nt:"TMA/851/2021 Art.37"},{id:"u9",l:"Señalización centro visible desde calle",nt:""},{id:"u10",l:"Iluminación adecuada del acceso",nt:"TMA/851/2021 Art.31"}];
const SEC_MOD_EXT=[{id:"me1",l:"Acceso a nivel sin escalones",nt:"CTE DB-SUA Anejo A"},{id:"me2",l:"Existe rampa de acceso",nt:"CTE DB-SUA 1, 4.3"},{id:"me3",l:"Rampa: pte. \u226410%(L<3m), \u22648%(L<6m), \u22646%(L<9m)",nt:"CTE DB-SUA 1, 4.3.1"},{id:"me4",l:"Rampa: ancho libre \u2265 1,20 m",nt:"CTE DB-SUA 1, 4.3.1"},{id:"me5",l:"Rampa: doble pasamanos AMBOS lados",nt:"CTE DB-SUA 1, 4.3.4: 0,90-1,10m y 0,65-0,75m"},{id:"me6",l:"Pasamanos continuo, prolongado 30cm",nt:"CTE DB-SUA 1, 4.3.4"},{id:"me7",l:"Puerta acceso \u2265 80 cm",nt:"CTE DB-SUA Anejo A"},{id:"me8",l:"Contraste cromático puerta entrada",nt:"Ley 6/2022 + UNE 170002"}];
const SEC_MOD_INT=[{id:"mi1",l:"Existe ascensor",nt:"CTE DB-SUA Anejo A"},{id:"mi2",l:"Ascensor comunica TODAS las plantas",nt:"CTE DB-SUA Anejo A"},{id:"mi3",l:"Cabina ascensor \u2265 1,10 x 1,40 m",nt:"CTE DB-SUA Anejo A"},{id:"mi4",l:"Pasillos \u2265 1,20 m",nt:"CTE DB-SUA Anejo A"},{id:"mi5",l:"Puertas aulas \u2265 80 cm",nt:"CTE DB-SUA Anejo A"},{id:"mi6",l:"Escaleras: doble pasamanos ambos lados",nt:"CTE DB-SUA 1, 4.3.4"},{id:"mi7",l:"Desniveles interiores SIN alternativa accesible",nt:"Registrar incumplimiento"},{id:"mi8",l:"Aseo adaptado disponible",nt:"CTE DB-SUA Anejo A"},{id:"mi9",l:"Aseo adaptado en planta baja",nt:"CTE DB-SUA Anejo A"},{id:"mi10",l:"Aseo: puerta \u226580cm abre hacia fuera",nt:"CTE DB-SUA Anejo A"},{id:"mi11",l:"Aseo: espacio giro \u22651,50m",nt:"CTE DB-SUA Anejo A"},{id:"mi12",l:"Aseo: barras de apoyo",nt:"CTE DB-SUA Anejo A"},{id:"mi13",l:"Aseo: dispositivo llamada emergencia",nt:"CTE DB-SUA Anejo A"},{id:"mi14",l:"Iluminación emergencia accesible",nt:"CTE DB-SUA 4, 1"},{id:"mi15",l:"Zona refugio evacuación accesible",nt:"CTE DB-SI 3, 9"}];
const SEC_COG=[{id:"c1",l:"Señalización lectura fácil",nt:"Ley 6/2022; UNE 153101:2018"},{id:"c2",l:"Pictogramas en puertas y espacios",nt:"Ley 6/2022; ARASAAC"},{id:"c3",l:"Código colores zonas/plantas",nt:"Wayfinding; UNE 170002"},{id:"c4",l:"Recorridos principales diferenciados",nt:"Ley 6/2022"},{id:"c5",l:"Mapas orientación zonas comunes",nt:"Wayfinding"},{id:"c6",l:"Señalización comprensible (texto+imagen)",nt:"Ley 6/2022"},{id:"c7",l:"Flechas o guías recorrido en suelo",nt:"Wayfinding"},{id:"c8",l:"Panel informativo entrada con plano",nt:""}];
const SEC_SENS=[{id:"s1",l:"Señalización Braille o altorrelieve",nt:"Ley 27/2007; UNE 170002"},{id:"s2",l:"Bucle inducción magnética",nt:"Ley 27/2007"},{id:"s3",l:"Contraste cromático puertas/escaleras",nt:"CTE DB-SUA"},{id:"s4",l:"Pavimento podotáctil interior",nt:"UNE CEN/TS 15209 EX"},{id:"s5",l:"Espacio baja estimulación (TEA)",nt:""},{id:"s6",l:"Tratamiento acústico aulas/comedor",nt:"CTE DB-HR"},{id:"s7",l:"Iluminación sin parpadeo",nt:""},{id:"s8",l:"Colores suaves zonas comunes",nt:""},{id:"s9",l:"Control ruido ambiental",nt:"CTE DB-HR"}];
const SEC_NEC=[{id:"n1",l:"Dispone de ATE"},{id:"n2",l:"Alumnado movilidad reducida actual"},{id:"n3",l:"Alumnado discapacidad visual"},{id:"n4",l:"Alumnado discapacidad auditiva"},{id:"n5",l:"Alumnado con TEA"},{id:"n6",l:"Alumnado discapacidad intelectual"},{id:"n7",l:"Alumnado necesidades médicas especiales"},{id:"n8",l:"Necesita más zonas de sombra"}];
const PATIO=[{id:"p1",l:"Patio accesible sin escalones",nt:"CTE DB-SUA"},{id:"p2",l:"Zonas de sombra",nt:""},{id:"p3",l:"Pistas deportivas accesibles",nt:""}];

function compressImage(file,mW=1200,q=0.6){return new Promise(r=>{const rd=new FileReader();rd.onload=e=>{const i=new Image();i.onload=()=>{const c=document.createElement("canvas");let w=i.width,h=i.height;if(w>mW){h=(mW/w)*h;w=mW}c.width=w;c.height=h;c.getContext("2d").drawImage(i,0,0,w,h);r(c.toDataURL("image/jpeg",q))};i.src=e.target.result};rd.readAsDataURL(file)})}

const BG="#0B1D3A",BG2="#122548",BG3="#1A3060",ACCENT="#C9A84C",TXT="#E8E8E8",TXT2="#A0B0C8",CARD="#152D55",BORDER="#1E3A6A";

function PhotoButton({itemId,photos,onPhoto}){
  const ref=useRef(null);
  const[showOpts,setShowOpts]=useState(false);
  const take=()=>{ref.current.setAttribute("capture","environment");ref.current.click();setShowOpts(false)};
  const pick=()=>{ref.current.removeAttribute("capture");ref.current.click();setShowOpts(false)};
  const hf=async e=>{if(e.target.files[0]){const c=await compressImage(e.target.files[0]);onPhoto(itemId,c)}e.target.value=""};
  const has=photos?.[itemId];
  return(<div style={{position:"relative",display:"inline-block"}}>
    <input type="file" accept="image/*" ref={ref} onChange={hf} style={{display:"none"}}/>
    <button onClick={()=>setShowOpts(!showOpts)} style={{padding:"6px 9px",borderRadius:5,border:"none",fontSize:12,cursor:"pointer",background:has?ACCENT:BG3,color:has?"#000":TXT2}}>📷</button>
    {showOpts&&<div style={{position:"absolute",right:0,top:32,background:CARD,border:"1px solid "+BORDER,borderRadius:8,padding:4,zIndex:20,minWidth:130,boxShadow:"0 4px 12px rgba(0,0,0,0.5)"}}>
      <button onClick={take} style={{display:"block",width:"100%",padding:"8px 10px",background:"transparent",border:"none",color:TXT,fontSize:12,cursor:"pointer",textAlign:"left",borderRadius:4}} onMouseOver={e=>e.target.style.background=BG3} onMouseOut={e=>e.target.style.background="transparent"}>📸 Hacer foto</button>
      <button onClick={pick} style={{display:"block",width:"100%",padding:"8px 10px",background:"transparent",border:"none",color:TXT,fontSize:12,cursor:"pointer",textAlign:"left",borderRadius:4}} onMouseOver={e=>e.target.style.background=BG3} onMouseOut={e=>e.target.style.background="transparent"}>🖼️ Galería</button>
    </div>}
  </div>);
}

function CheckList({items,answers,onToggle,photos,onPhoto}){
  return(<div>
    {items.map(item=>(<div key={item.id} style={{borderBottom:"1px solid "+BORDER,padding:"8px 4px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:6}}>
        <div style={{flex:1}}>
          <span style={{fontSize:13,lineHeight:1.4,display:"block",color:TXT}}>{item.l}</span>
          {item.nt&&<span style={{fontSize:10,color:TXT2,fontStyle:"italic"}}>{item.nt}</span>}
        </div>
        <div style={{display:"flex",gap:3,flexShrink:0,alignItems:"center"}}>
          {["si","no","na"].map(v=>(<button key={v} onClick={()=>onToggle(item.id,v)} style={{padding:"6px 11px",borderRadius:5,border:"none",fontSize:11,fontWeight:700,cursor:"pointer",background:answers[item.id]===v?(v==="si"?"#2E7D32":v==="no"?"#C62828":"#555"):BG3,color:answers[item.id]===v?"#fff":TXT2}}>{v==="si"?"Sí":v==="no"?"No":"N/A"}</button>))}
          <PhotoButton itemId={item.id} photos={photos} onPhoto={onPhoto}/>
        </div>
      </div>
      {photos?.[item.id]&&<img src={photos[item.id]} style={{maxWidth:120,borderRadius:6,marginTop:4}} alt=""/>}
    </div>))}
  </div>);
}

function ModuloForm({modulo,onChange,onRemove,canRemove}){
  const[tab,setTab]=useState("ext");
  const upd=(k,v)=>onChange({...modulo,[k]:v});
  const togA=(id,v)=>upd("answers",{...modulo.answers,[id]:v});
  const addP=(id,d)=>upd("photos",{...(modulo.photos||{}),[id]:d});
  const tabs=[{k:"ext",l:"🚪 Acceso"},{k:"int",l:"🏗️ Interior"},{k:"cog",l:"🧠 Cognitiva"},{k:"sen",l:"👁️ Sensorial"},{k:"pat",l:"🌳 Patio"}];
  const its={ext:SEC_MOD_EXT,int:SEC_MOD_INT,cog:SEC_COG,sen:SEC_SENS,pat:PATIO};
  const inp={width:"100%",padding:"8px 10px",border:"1px solid "+BORDER,borderRadius:6,fontSize:13,fontWeight:600,background:BG3,color:TXT,boxSizing:"border-box",fontFamily:"inherit"};
  return(
    <div style={{border:"2px solid "+ACCENT,borderRadius:10,padding:10,marginBottom:12,background:CARD}}>
      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
        <input style={inp} value={modulo.nombre} onChange={e=>upd("nombre",e.target.value)} placeholder="Nombre: Edificio principal..."/>
        {canRemove&&<button onClick={onRemove} style={{background:"#C62828",color:"#fff",border:"none",borderRadius:"50%",width:28,height:28,fontSize:14,cursor:"pointer",fontWeight:700}}>✕</button>}
      </div>
      <div style={{display:"flex",gap:8,marginBottom:6}}>
        <div style={{flex:1}}><label style={{fontSize:10,fontWeight:600,color:TXT2}}>Plantas</label><input style={{...inp,fontWeight:400}} type="number" value={modulo.plantas||""} onChange={e=>upd("plantas",e.target.value)}/></div>
        <div style={{flex:2}}><label style={{fontSize:10,fontWeight:600,color:TXT2}}>Tipo usuario principal</label>
          <select style={{...inp,fontWeight:400}} value={modulo.tipo||""} onChange={e=>upd("tipo",e.target.value)}>
            <option value="">-- Seleccionar --</option><option value="infantil">Infantil (3-6)</option><option value="primaria">Primaria (6-12)</option>
            <option value="secundaria">Secundaria/Bach (12-18)</option><option value="admin">Administrativo</option>
          </select></div>
      </div>
      {modulo.tipo&&modulo.tipo!=="admin"&&<div style={{background:"#3E2723",borderRadius:6,padding:"5px 8px",marginBottom:6,fontSize:11,color:"#FFAB91"}}>
        ⚠️ Módulo {modulo.tipo}: aseos adaptados a altura del alumnado. CTE íntegro solo en zonas administrativas.
      </div>}
      <div style={{display:"flex",gap:3,marginBottom:8,flexWrap:"wrap"}}>
        {tabs.map(t=><button key={t.k} onClick={()=>setTab(t.k)} style={{padding:"7px 10px",borderRadius:6,border:"none",fontSize:11,fontWeight:600,cursor:"pointer",background:tab===t.k?ACCENT:BG3,color:tab===t.k?"#000":TXT2,flex:1,textAlign:"center",minWidth:55}}>{t.l}</button>)}
      </div>
      <CheckList items={its[tab]||[]} answers={modulo.answers||{}} onToggle={togA} photos={modulo.photos} onPhoto={addP}/>
      <div style={{marginTop:6}}><label style={{fontSize:10,fontWeight:600,color:TXT2}}>Observaciones del módulo</label>
        <textarea style={{width:"100%",padding:6,border:"1px solid "+BORDER,borderRadius:5,fontSize:12,resize:"vertical",height:44,background:BG3,color:TXT,fontFamily:"inherit",boxSizing:"border-box"}} value={modulo.obs||""} onChange={e=>upd("obs",e.target.value)} placeholder="Deficiencias, urgencias, detalles..."/></div>
    </div>);
}

function Header(){
  return(
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 16px",background:"linear-gradient(135deg,"+BG3+","+BG2+")",borderRadius:12,marginBottom:14,border:"1px solid "+BORDER}}>
      <img src={CARM_LOGO} alt="CARM" style={{height:70}}/>
      <div style={{textAlign:"center",flex:1,padding:"0 8px"}}><div style={{color:"#fff",fontSize:15,fontWeight:700}}>Diagnóstico de Accesibilidad</div><div style={{color:TXT2,fontSize:10,marginTop:2}}>Plan Accesibilidad Regional · D.177/2024</div></div>
      <img src={ACC_LOGO} alt="Accesibilidad" style={{height:74}}/>
    </div>);
}

function FormView({onSubmit}){
  const[centro,setCentro]=useState("");const[centroC,setCentroC]=useState("");
  const[muni,setMuni]=useState("");const[tec,setTec]=useState("");
  const[extA,setExtA]=useState({});const[extP,setExtP]=useState({});const[extObs,setExtObs]=useState("");const[carr,setCarr]=useState("");
  const[mods,setMods]=useState([{nombre:"Edificio principal",plantas:"",tipo:"",answers:{},photos:{},obs:""}]);
  const[necA,setNecA]=useState({});const[obsG,setObsG]=useState("");
  const[mt,setMt]=useState("datos");const[ok,setOk]=useState(false);
  const[sending,setSending]=useState(false);

  const hC=v=>{setCentro(v);const c=CENTROS.find(x=>x.n===v);if(c)setMuni(c.m)};
  const addM=()=>setMods([...mods,{nombre:"Módulo "+String.fromCharCode(65+mods.length),plantas:"",tipo:"",answers:{},photos:{},obs:""}]);
  const updM=(i,m)=>setMods(mods.map((x,j)=>j===i?m:x));
  const remM=i=>{if(mods.length>1)setMods(mods.filter((_,j)=>j!==i))};

  const doSubmit=async()=>{
    const nom=centro==="--- Otro centro ---"?centroC:centro;
    if(!nom||!tec){alert("Rellena al menos centro y técnico");return}
    setSending(true);
    const data={centro:nom,municipio:muni,tecnico:tec,extA,extObs,carriles:carr,
      modulos:mods.map(m=>({nombre:m.nombre,plantas:m.plantas,tipo:m.tipo,answers:m.answers,obs:m.obs})),
      necA,obsGen:obsG,
      fecha:new Date().toLocaleDateString("es-ES"),
      hora:new Date().toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"}),
      id:Date.now().toString()};
    await onSubmit(data);
    setSending(false);setOk(true);
  };

  if(ok)return(
    <div style={{padding:40,textAlign:"center"}}><div style={{fontSize:56}}>✅</div>
      <h2 style={{color:ACCENT,margin:"12px 0"}}>Diagnóstico registrado</h2>
      <p style={{color:TXT2,fontSize:13}}>Datos guardados y enviados a Google Sheets.</p>
      <button onClick={()=>{setOk(false);setCentro("");setMuni("");setTec("");setExtA({});setExtP({});setExtObs("");setCarr("");setMods([{nombre:"Edificio principal",plantas:"",tipo:"",answers:{},photos:{},obs:""}]);setNecA({});setObsG("")}}
        style={{padding:"14px 28px",background:ACCENT,color:"#000",border:"none",borderRadius:8,fontSize:15,fontWeight:700,cursor:"pointer",marginTop:16}}>Nuevo diagnóstico</button>
    </div>);

  const mTabs=[{k:"datos",l:"📋 Datos"},{k:"urbano",l:"🏙️ Entorno"},{k:"modulos",l:"📦 Módulos ("+mods.length+")"},{k:"nec",l:"♿ Necesid."},{k:"enviar",l:"✅ Enviar"}];
  const inp={width:"100%",padding:"9px 10px",border:"1px solid "+BORDER,borderRadius:7,fontSize:13,boxSizing:"border-box",background:BG3,color:TXT,fontFamily:"inherit"};
  const lbl={display:"block",fontSize:11,fontWeight:600,color:TXT2,marginBottom:3};

  return(
    <div style={{padding:"8px 12px",maxWidth:600,margin:"0 auto"}}>
      <Header/>
      <div style={{display:"flex",gap:3,marginBottom:10,flexWrap:"wrap"}}>
        {mTabs.map(t=><button key={t.k} onClick={()=>setMt(t.k)} style={{padding:"8px 8px",borderRadius:7,border:"none",fontSize:11,fontWeight:600,cursor:"pointer",background:mt===t.k?ACCENT:BG3,color:mt===t.k?"#000":TXT2,flex:1,textAlign:"center",minWidth:55}}>{t.l}</button>)}
      </div>
      {mt==="datos"&&<div style={{display:"flex",flexDirection:"column",gap:10}}>
        <div><label style={lbl}>Centro educativo *</label><select style={inp} value={centro} onChange={e=>hC(e.target.value)}>
          <option value="">-- Seleccionar centro --</option>{CENTROS.map(c=><option key={c.n} value={c.n}>{c.n}</option>)}</select></div>
        {centro==="--- Otro centro ---"&&<input style={inp} value={centroC} onChange={e=>setCentroC(e.target.value)} placeholder="Nombre del centro"/>}
        <div style={{display:"flex",gap:8}}>
          <div style={{flex:1}}><label style={lbl}>Municipio</label><input style={{...inp,opacity:0.7}} value={muni} readOnly/></div>
          <div style={{flex:1}}><label style={lbl}>Técnico *</label><input style={inp} value={tec} onChange={e=>setTec(e.target.value)} placeholder="Tu nombre"/></div>
        </div>
      </div>}
      {mt==="urbano"&&<div>
        <h4 style={{color:ACCENT,fontSize:14,margin:"0 0 8px"}}>Entorno urbano (TMA/851/2021)</h4>
        <CheckList items={SEC_URBANO} answers={extA} onToggle={(id,v)=>setExtA(p=>({...p,[id]:v}))} photos={extP} onPhoto={(id,d)=>setExtP(p=>({...p,[id]:d}))}/>
        <div style={{marginTop:8}}><label style={lbl}>Nº carriles calle principal</label><input style={{...inp,width:80}} type="number" value={carr} onChange={e=>setCarr(e.target.value)}/></div>
        <div style={{marginTop:6}}><label style={lbl}>Observaciones entorno</label><textarea style={{...inp,height:50,resize:"vertical",fontSize:12}} value={extObs} onChange={e=>setExtObs(e.target.value)} placeholder="Estado aceras, obstáculos..."/></div>
      </div>}
      {mt==="modulos"&&<div>
        {mods.map((m,i)=><ModuloForm key={i} modulo={m} onChange={m2=>updM(i,m2)} onRemove={()=>remM(i)} canRemove={mods.length>1}/>)}
        <button onClick={addM} style={{width:"100%",padding:12,background:"transparent",border:"2px dashed "+ACCENT,borderRadius:10,color:ACCENT,fontWeight:700,fontSize:13,cursor:"pointer"}}>+ Añadir módulo / pabellón</button>
      </div>}
      {mt==="nec"&&<div>
        <h4 style={{color:ACCENT,fontSize:14,margin:"0 0 8px"}}>Recursos y necesidades específicas</h4>
        <CheckList items={SEC_NEC} answers={necA} onToggle={(id,v)=>setNecA(p=>({...p,[id]:v}))} photos={{}} onPhoto={()=>{}}/>
      </div>}
      {mt==="enviar"&&<div>
        <h4 style={{color:ACCENT,fontSize:14,margin:"0 0 8px"}}>Observaciones generales</h4>
        <textarea style={{...inp,height:80,resize:"vertical",fontSize:13}} value={obsG} onChange={e=>setObsG(e.target.value)} placeholder="Valoración general, prioridades..."/>
        <button onClick={doSubmit} disabled={sending} style={{width:"100%",padding:16,background:sending?"#555":ACCENT,color:sending?TXT2:"#000",border:"none",borderRadius:10,fontSize:16,fontWeight:700,cursor:sending?"wait":"pointer",marginTop:20}}>
          {sending?"⏳ Enviando...":"✅ Enviar diagnóstico"}
        </button>
      </div>}
    </div>);
}

function DashView({entries,onExport}){
  const t=entries.length;const pct=n=>t>0?Math.round((n/t)*100):0;
  const cE=(f,v)=>entries.filter(e=>e.extA?.[f]===v).length;
  const cM=(f,v)=>{let c=0;entries.forEach(e=>(e.modulos||[]).forEach(m=>{if(m.answers?.[f]===v)c++}));return c};
  const tM=entries.reduce((s,e)=>s+(e.modulos?.length||0),0);
  return(
    <div style={{padding:"8px 12px",maxWidth:800,margin:"0 auto"}}>
      <Header/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
        <div style={{background:CARD,borderRadius:8,padding:14,textAlign:"center",border:"1px solid "+BORDER}}><div style={{fontSize:32,fontWeight:800,color:ACCENT}}>{t}</div><div style={{fontSize:12,color:TXT2}}>Centros evaluados</div></div>
        <div style={{background:CARD,borderRadius:8,padding:14,textAlign:"center",border:"1px solid "+BORDER}}><div style={{fontSize:32,fontWeight:800,color:ACCENT}}>{tM}</div><div style={{fontSize:12,color:TXT2}}>Módulos evaluados</div></div>
      </div>
      {t>0&&<>
        <h4 style={{color:ACCENT,fontSize:13,margin:"0 0 6px"}}>Entorno urbano ({t} centros)</h4>
        <div style={{background:CARD,borderRadius:8,padding:10,marginBottom:12,fontSize:12,border:"1px solid "+BORDER}}>
          {[["Itinerario accesible","u1"],["Aceras \u22651,80m","u2"],["Plaza PMR","u8"],["Parada bus","u6"],["Vados táctil","u5"],["Iluminación","u10"]].map(([l,f])=>
            <div key={f} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:"1px solid "+BORDER,color:TXT}}><span>{l}</span><span style={{fontWeight:700,color:ACCENT}}>{cE(f,"si")}/{t} ({pct(cE(f,"si"))}%)</span></div>)}
        </div>
        <h4 style={{color:ACCENT,fontSize:13,margin:"0 0 6px"}}>Módulos ({tM})</h4>
        <div style={{background:CARD,borderRadius:8,padding:10,marginBottom:12,fontSize:12,border:"1px solid "+BORDER}}>
          {[["Ascensor","mi1"],["Aseo adaptado","mi8"],["Acceso nivel","me1"],["Doble pasamanos","me5"],["Pictogramas","c2"],["Código colores","c3"],["Lectura fácil","c1"],["Espacio TEA","s5"],["Braille","s1"],["Bucle magnético","s2"]].map(([l,f])=>
            <div key={f} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:"1px solid "+BORDER,color:TXT}}><span>{l}</span><span style={{fontWeight:700,color:ACCENT}}>{cM(f,"si")}/{tM}</span></div>)}
        </div>
        <h4 style={{color:ACCENT,fontSize:13,margin:"0 0 6px"}}>Registros</h4>
        {entries.map(e=>(<div key={e.id} style={{background:CARD,border:"1px solid "+BORDER,borderRadius:8,padding:10,marginBottom:8,borderLeft:"4px solid "+ACCENT}}>
            <div style={{display:"flex",justifyContent:"space-between"}}><strong style={{fontSize:13,color:TXT}}>{e.centro}</strong><span style={{fontSize:10,color:TXT2}}>{e.fecha} {e.hora}</span></div>
            <div style={{fontSize:11,color:TXT2}}>{e.municipio} · {e.tecnico} · {e.modulos?.length||0} módulos</div>
          </div>))}
        <button onClick={onExport} style={{width:"100%",padding:14,background:"#2E7D32",color:"#fff",border:"none",borderRadius:10,fontSize:14,fontWeight:700,cursor:"pointer",marginTop:10,marginBottom:30}}>📥 Exportar CSV</button>
      </>}
      {t===0&&<p style={{textAlign:"center",color:TXT2,padding:30,fontSize:13}}>Sin registros aún.</p>}
    </div>);
}

export default function App(){
  const[mode,setMode]=useState("form");
  const[entries,setEntries]=useState([]);
  const[pin,setPin]=useState("");
  const[auth,setAuth]=useState(false);
  const[showPin,setShowPin]=useState(false);
  const SHEETS_URL="https://script.google.com/macros/s/AKfycbwwB0h093ruK61AKHryE_hhzVyQhjDliM58nHR0OE13enpnwFZvxd_U__aKRHqLP1T16A/exec";

  useEffect(()=>{
    (async()=>{try{const r=localStorage.getItem("acc-diag-v7");if(r)setEntries(JSON.parse(r))}catch(e){}})();
  },[]);

  const save=async(data)=>{
    const u=[...entries,data];setEntries(u);
    try{localStorage.setItem("acc-diag-v7",JSON.stringify(u))}catch(e){}
    try{await fetch(SHEETS_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain"},body:JSON.stringify(data)})}catch(e){console.log("Sheets send failed:",e)}
  };

  const doExport=()=>{
    const all=[...SEC_URBANO,...SEC_MOD_EXT,...SEC_MOD_INT,...SEC_COG,...SEC_SENS,...SEC_NEC,...PATIO];
    const rows=[];
    entries.forEach(e=>{(e.modulos||[{}]).forEach(m=>{
      const row={Centro:e.centro,Municipio:e.municipio,Tecnico:e.tecnico,Fecha:e.fecha,Hora:e.hora,Carriles:e.carriles||"",ObsEntorno:e.extObs||"",
        Modulo:m.nombre||"",TipoUsuario:m.tipo||"",Plantas:m.plantas||"",ObsModulo:m.obs||"",ObsGeneral:e.obsGen||""};
      all.forEach(item=>{row[item.id]=e.extA?.[item.id]||m.answers?.[item.id]||e.necA?.[item.id]||""});
      rows.push(row)})});
    if(!rows.length)return;
    const keys=Object.keys(rows[0]);
    const csv=[keys.join(";"),...rows.map(r=>keys.map(k=>{const v=(r[k]||"").toString().replace(/"/g,'""').replace(/\n/g," ");return '"'+v+'"'}).join(";"))].join("\n");
    const blob=new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8"});
    const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="diagnostico_accesibilidad_"+new Date().toISOString().slice(0,10)+".csv";a.click();
  };

  return(
    <div style={{fontFamily:"-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif",background:BG,minHeight:"100vh"}}>
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:8,padding:"10px 12px",background:BG2,borderBottom:"1px solid "+BORDER,position:"sticky",top:0,zIndex:10}}>
        <button onClick={()=>{setMode("form");setShowPin(false)}} style={{padding:"8px 22px",borderRadius:20,border:"none",fontSize:13,fontWeight:600,cursor:"pointer",background:mode==="form"?ACCENT:BG3,color:mode==="form"?"#000":TXT2}}>📋 Formulario</button>
        <button onClick={()=>{if(auth){setMode("dash")}else{setShowPin(true);setMode("pin")}}} style={{padding:"8px 22px",borderRadius:20,border:"none",fontSize:13,fontWeight:600,cursor:"pointer",background:mode==="dash"?ACCENT:BG3,color:mode==="dash"?"#000":TXT2}}>🔒 Panel</button>
      </div>
      {mode==="pin"&&!auth&&(
        <div style={{padding:20,textAlign:"center"}}>
          <div style={{background:CARD,border:"1px solid "+BORDER,borderRadius:12,padding:24,maxWidth:300,margin:"40px auto"}}>
            <div style={{fontSize:36,marginBottom:10}}>🔐</div>
            <div style={{color:TXT,fontSize:14,fontWeight:600,marginBottom:12}}>Introduce el PIN</div>
            <input type="password" value={pin} onChange={e=>setPin(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"){if(pin==="2812"){setAuth(true);setMode("dash")}else{alert("PIN incorrecto");setPin("")}}}}
              style={{width:120,padding:"10px 14px",border:"2px solid "+ACCENT,borderRadius:8,fontSize:20,textAlign:"center",background:BG3,color:TXT,fontFamily:"inherit",letterSpacing:6,boxSizing:"border-box"}}
              maxLength={4} autoFocus placeholder="····"/>
            <div style={{marginTop:14}}>
              <button onClick={()=>{if(pin==="2812"){setAuth(true);setMode("dash")}else{alert("PIN incorrecto");setPin("")}}} style={{padding:"10px 30px",background:ACCENT,color:"#000",border:"none",borderRadius:8,fontSize:14,fontWeight:700,cursor:"pointer"}}>Acceder</button>
            </div>
          </div>
        </div>
      )}
      {mode==="dash"&&auth&&<DashView entries={entries} onExport={doExport}/>}
      <div style={{textAlign:"center",padding:"20px 12px 12px",borderTop:"1px solid "+BORDER,marginTop:20}}>
        <div style={{fontSize:10,color:TXT2,opacity:0.6}}>v1.0 · © 2026 Diego Aroca · Consejería de Educación y FP · Región de Murcia</div>
      </div>
    </div>);
}
