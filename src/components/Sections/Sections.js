import React from "react";


import trye from "../../utils/trye.png";
import document from "../../utils/document.png";
import doctor from "../../utils/doctor.png";
import org from "../../utils/orgg.png";
import home from "../../utils/home.png";
import refresh from "../../utils/refresh.png";
import './sections.css';

const Sections = () => {
  return(
    <div className="sections">
      <div className="sectioncont">
        <div className="sectioniconcont">
          <div className="secticonalign">
            <img className="sectionicon" src={trye} alt="" />
          </div>
        </div>
        <div className="sectionname">
          Çek & Senet Tahsitalı
        </div>
        <div className="sectionexp">
          Ödeme sistemlerinin noter aracılığı olmadan doğrulama hizmeti
        </div>
      </div>

       <div className="sectioncont">
        <div className="sectioniconcont">
          <div className="secticonalign">
            <img className="sectionicon" src={doctor} alt="" />
          </div>
        </div>
        <div className="sectionname">
          e-Reçete
        </div>
        <div className="sectionexp">
          Reçete hizmetlerinin değiştirelemez bir şiekilde blok zincirde saklanması
        </div>
      </div>

       <div className="sectioncont">
        <div className="sectioniconcont">
          <div className="secticonalign">
            <img className="sectionicon" src={org} alt="" />
          </div>
        </div>
        <div className="sectionname">
          SGK
        </div>
        <div className="sectionexp">
          Sosyal güvenlik verisi imzalama ve sorgulama
        </div>
      </div>

       <div className="sectioncont">
        <div className="sectioniconcont">
          <div className="secticonalign">
            <img className="sectionicon" src={home} alt="" />
          </div>
        </div>
        <div className="sectionname">
          Çek & Senet Tahsitalı
        </div>
        <div className="sectionexp">
          Çek ve senetleri noter aracılığı olmadan doğrulama hizmeti
        </div>
      </div>

       <div className="sectioncont">
        <div className="sectioniconcont">
          <div className="secticonalign">
            <img className="sectionicon" src={refresh} alt="" />
          </div>
        </div>
        <div className="sectionname">
          Saygınlık
        </div>
        <div className="sectionexp">
          Sürdürülebilir topluluk ekonomisi
        </div>
      </div>

    </div>
  );
};

export default Sections;