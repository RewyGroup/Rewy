import React,{useState} from 'react';
import {Col,Nav} from 'react-bootstrap';
import './Sidebar.css'
import { useEffect } from 'react';


function Sidebar(props) {
        const {active} = props;
        const [activeKey,setActiveKey] = useState("");        
        const handleSelect = (eventKey) => {
                setActiveKey(eventKey);
        };

        useEffect(()=>{
                switch(active){
                        case 'EXPLORE':
                                setActiveKey("1");
                                break;
                        case 'USERS':
                                setActiveKey("3");
                                break;                                
                        case 'ASK':
                                setActiveKey("4");
                                break;
                        default:
                                setActiveKey("0");
                                break;
                }
        },[]);
        
 
        return (


                

                    <Col className="sidebar">
    <Nav className="sideBarNav" activeKey={activeKey} onSelect={handleSelect} >
  <Nav.Link href="/question/all" eventKey="1" value="1" className="sidebarElement"><svg className="sidebarIcon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7363 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0V0ZM11 17.93V17C11 16.7348 10.8946 16.4804 10.7071 16.2929C10.5196 16.1054 10.2652 16 10 16C9.73479 16 9.48043 16.1054 9.2929 16.2929C9.10536 16.4804 9 16.7348 9 17V17.93C7.23998 17.7068 5.60408 16.9049 4.34959 15.6504C3.0951 14.3959 2.2932 12.76 2.07 11H3C3.26522 11 3.51957 10.8946 3.70711 10.7071C3.89465 10.5196 4 10.2652 4 10C4 9.73478 3.89465 9.48043 3.70711 9.29289C3.51957 9.10536 3.26522 9 3 9H2.07C2.2932 7.23998 3.0951 5.60408 4.34959 4.34959C5.60408 3.0951 7.23998 2.29319 9 2.07V3C9 3.26522 9.10536 3.51957 9.2929 3.70711C9.48043 3.89464 9.73479 4 10 4C10.2652 4 10.5196 3.89464 10.7071 3.70711C10.8946 3.51957 11 3.26522 11 3V2.07C12.76 2.29319 14.3959 3.0951 15.6504 4.34959C16.9049 5.60408 17.7068 7.23998 17.93 9H17C16.7348 9 16.4804 9.10536 16.2929 9.29289C16.1054 9.48043 16 9.73478 16 10C16 10.2652 16.1054 10.5196 16.2929 10.7071C16.4804 10.8946 16.7348 11 17 11H17.93C17.7068 12.76 16.9049 14.3959 15.6504 15.6504C14.3959 16.9049 12.76 17.7068 11 17.93ZM13.14 5.55L8.14001 7.67C7.90692 7.77099 7.721 7.95691 7.62 8.19L5.5 13.19C5.42125 13.3734 5.39916 13.5761 5.43658 13.7722C5.47401 13.9682 5.56923 14.1485 5.71 14.29C5.89463 14.4784 6.14623 14.5862 6.41 14.59C6.54837 14.5901 6.68503 14.5594 6.81 14.5L11.81 12.38C12.0431 12.279 12.229 12.0931 12.33 11.86L14.45 6.86C14.5273 6.67676 14.5482 6.47463 14.51 6.27946C14.4718 6.08429 14.3763 5.90493 14.2357 5.7643C14.0951 5.62368 13.9157 5.52818 13.7205 5.49001C13.5254 5.45183 13.3232 5.47272 13.14 5.55V5.55ZM10.65 10.65L8.37 11.65L9.37 9.37L11.65 8.37L10.65 10.65Z" fill="#BDBEC0"/>
</svg>utforska</Nav.Link>
  <Nav.Link eventKey="2" value="2" className="sidebarElement"><svg className="sidebarIcon" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.9004 11.2012L22.1777 3.56934C22.1411 3.17383 21.8262 2.86133 21.4306 2.82227L13.7988 2.09961H13.789C13.7109 2.09961 13.6499 2.12402 13.6035 2.17041L2.1704 13.6035C2.14776 13.6261 2.12981 13.6529 2.11756 13.6825C2.10531 13.712 2.099 13.7437 2.099 13.7756C2.099 13.8076 2.10531 13.8393 2.11756 13.8688C2.12981 13.8983 2.14776 13.9252 2.1704 13.9478L11.0522 22.8296C11.0986 22.876 11.1597 22.9004 11.2256 22.9004C11.2915 22.9004 11.3525 22.876 11.3989 22.8296L22.832 11.3965C22.8808 11.3452 22.9053 11.2744 22.9004 11.2012V11.2012ZM11.2231 20.3784L4.62157 13.7769L14.3799 4.01855L20.4101 4.58984L20.9814 10.6201L11.2231 20.3784ZM16.6015 6.25C15.4175 6.25 14.4531 7.21436 14.4531 8.39844C14.4531 9.58252 15.4175 10.5469 16.6015 10.5469C17.7856 10.5469 18.75 9.58252 18.75 8.39844C18.75 7.21436 17.7856 6.25 16.6015 6.25ZM16.6015 9.17969C16.1694 9.17969 15.8203 8.83057 15.8203 8.39844C15.8203 7.96631 16.1694 7.61719 16.6015 7.61719C17.0337 7.61719 17.3828 7.96631 17.3828 8.39844C17.3828 8.83057 17.0337 9.17969 16.6015 9.17969Z" fill="#BDBEC0"/>
</svg>Trendiga Kategorier</Nav.Link>
  <Nav.Link href="/users/all" eventKey="3" className="sidebarElement"><svg className="sidebarIcon" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.1875 11.771C15.6609 11.1793 15.9214 10.4454 15.9271 9.68766C15.9271 8.77874 15.566 7.90705 14.9233 7.26435C14.2806 6.62165 13.4089 6.26058 12.5 6.26058C11.5911 6.26058 10.7194 6.62165 10.0767 7.26435C9.43398 7.90705 9.07292 8.77874 9.07292 9.68766C9.07856 10.4454 9.33907 11.1793 9.8125 11.771C8.88399 12.336 8.15552 13.1774 7.72917 14.1772C7.66949 14.3041 7.63604 14.4417 7.63081 14.5818C7.62558 14.7219 7.64869 14.8616 7.69874 14.9925C7.74879 15.1235 7.82476 15.243 7.92209 15.3439C8.01943 15.4448 8.13613 15.525 8.2652 15.5797C8.39427 15.6344 8.53306 15.6625 8.67325 15.6623C8.81344 15.6621 8.95214 15.6336 9.08106 15.5785C9.20997 15.5234 9.32644 15.4429 9.42349 15.3417C9.52053 15.2406 9.59616 15.1208 9.64583 14.9897C9.88524 14.4301 10.2829 13.9526 10.7899 13.6158C11.297 13.279 11.8913 13.0976 12.5 13.0939C13.1105 13.0956 13.7071 13.276 14.2161 13.6129C14.7252 13.9498 15.1245 14.4285 15.3646 14.9897C15.4443 15.178 15.5777 15.3387 15.7481 15.4517C15.9185 15.5647 16.1184 15.625 16.3229 15.6252C16.4623 15.6226 16.6 15.5943 16.7292 15.5418C16.9832 15.4339 17.184 15.2296 17.2875 14.9738C17.391 14.7179 17.3888 14.4314 17.2812 14.1772C16.8522 13.1759 16.1199 12.3344 15.1875 11.771ZM12.5 11.0106C12.2338 11.0106 11.9736 10.9315 11.7524 10.7834C11.5312 10.6353 11.359 10.4248 11.2576 10.1786C11.1562 9.93248 11.1302 9.66176 11.1829 9.40082C11.2356 9.13988 11.3646 8.90047 11.5536 8.71297C11.7425 8.52546 11.9829 8.39831 12.2443 8.34764C12.5056 8.29697 12.7761 8.32508 13.0215 8.42838C13.2668 8.53168 13.476 8.70554 13.6224 8.92788C13.7688 9.15023 13.8458 9.41104 13.8438 9.67725C13.841 10.0318 13.6982 10.3709 13.4465 10.6207C13.1948 10.8704 12.8546 11.0106 12.5 11.0106ZM18.75 2.0835H6.25C5.4212 2.0835 4.62634 2.41274 4.04029 2.99879C3.45424 3.58484 3.125 4.37969 3.125 5.2085V16.6668C3.125 17.4956 3.45424 18.2905 4.04029 18.8765C4.62634 19.4626 5.4212 19.7918 6.25 19.7918H8.94792L11.7604 22.6147C11.8577 22.7113 11.9732 22.7877 12.1001 22.8395C12.227 22.8913 12.3629 22.9176 12.5 22.9168C12.7483 22.9168 12.9884 22.8282 13.1771 22.6668L16.5312 19.7918H18.75C19.5788 19.7918 20.3737 19.4626 20.9597 18.8765C21.5458 18.2905 21.875 17.4956 21.875 16.6668V5.2085C21.875 4.37969 21.5458 3.58484 20.9597 2.99879C20.3737 2.41274 19.5788 2.0835 18.75 2.0835ZM19.7917 16.6668C19.7917 16.9431 19.6819 17.208 19.4866 17.4034C19.2912 17.5987 19.0263 17.7085 18.75 17.7085H16.1458C15.8976 17.7085 15.6574 17.7971 15.4688 17.9585L12.5521 20.4585L10.1146 18.0106C10.0172 17.914 9.90182 17.8377 9.7749 17.7858C9.64799 17.734 9.51209 17.7077 9.375 17.7085H6.25C5.97373 17.7085 5.70878 17.5987 5.51343 17.4034C5.31808 17.208 5.20833 16.9431 5.20833 16.6668V5.2085C5.20833 4.93223 5.31808 4.66728 5.51343 4.47193C5.70878 4.27658 5.97373 4.16683 6.25 4.16683H18.75C19.0263 4.16683 19.2912 4.27658 19.4866 4.47193C19.6819 4.66728 19.7917 4.93223 19.7917 5.2085V16.6668Z" fill="#BDBEC0"/>
</svg>Användare</Nav.Link>
<Nav.Link  href="/question/create" eventKey="4" className="sidebarElement"><svg className="sidebarIcon" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.1875 11.771C15.6609 11.1793 15.9214 10.4454 15.9271 9.68766C15.9271 8.77874 15.566 7.90705 14.9233 7.26435C14.2806 6.62165 13.4089 6.26058 12.5 6.26058C11.5911 6.26058 10.7194 6.62165 10.0767 7.26435C9.43398 7.90705 9.07292 8.77874 9.07292 9.68766C9.07856 10.4454 9.33907 11.1793 9.8125 11.771C8.88399 12.336 8.15552 13.1774 7.72917 14.1772C7.66949 14.3041 7.63604 14.4417 7.63081 14.5818C7.62558 14.7219 7.64869 14.8616 7.69874 14.9925C7.74879 15.1235 7.82476 15.243 7.92209 15.3439C8.01943 15.4448 8.13613 15.525 8.2652 15.5797C8.39427 15.6344 8.53306 15.6625 8.67325 15.6623C8.81344 15.6621 8.95214 15.6336 9.08106 15.5785C9.20997 15.5234 9.32644 15.4429 9.42349 15.3417C9.52053 15.2406 9.59616 15.1208 9.64583 14.9897C9.88524 14.4301 10.2829 13.9526 10.7899 13.6158C11.297 13.279 11.8913 13.0976 12.5 13.0939C13.1105 13.0956 13.7071 13.276 14.2161 13.6129C14.7252 13.9498 15.1245 14.4285 15.3646 14.9897C15.4443 15.178 15.5777 15.3387 15.7481 15.4517C15.9185 15.5647 16.1184 15.625 16.3229 15.6252C16.4623 15.6226 16.6 15.5943 16.7292 15.5418C16.9832 15.4339 17.184 15.2296 17.2875 14.9738C17.391 14.7179 17.3888 14.4314 17.2812 14.1772C16.8522 13.1759 16.1199 12.3344 15.1875 11.771ZM12.5 11.0106C12.2338 11.0106 11.9736 10.9315 11.7524 10.7834C11.5312 10.6353 11.359 10.4248 11.2576 10.1786C11.1562 9.93248 11.1302 9.66176 11.1829 9.40082C11.2356 9.13988 11.3646 8.90047 11.5536 8.71297C11.7425 8.52546 11.9829 8.39831 12.2443 8.34764C12.5056 8.29697 12.7761 8.32508 13.0215 8.42838C13.2668 8.53168 13.476 8.70554 13.6224 8.92788C13.7688 9.15023 13.8458 9.41104 13.8438 9.67725C13.841 10.0318 13.6982 10.3709 13.4465 10.6207C13.1948 10.8704 12.8546 11.0106 12.5 11.0106ZM18.75 2.0835H6.25C5.4212 2.0835 4.62634 2.41274 4.04029 2.99879C3.45424 3.58484 3.125 4.37969 3.125 5.2085V16.6668C3.125 17.4956 3.45424 18.2905 4.04029 18.8765C4.62634 19.4626 5.4212 19.7918 6.25 19.7918H8.94792L11.7604 22.6147C11.8577 22.7113 11.9732 22.7877 12.1001 22.8395C12.227 22.8913 12.3629 22.9176 12.5 22.9168C12.7483 22.9168 12.9884 22.8282 13.1771 22.6668L16.5312 19.7918H18.75C19.5788 19.7918 20.3737 19.4626 20.9597 18.8765C21.5458 18.2905 21.875 17.4956 21.875 16.6668V5.2085C21.875 4.37969 21.5458 3.58484 20.9597 2.99879C20.3737 2.41274 19.5788 2.0835 18.75 2.0835ZM19.7917 16.6668C19.7917 16.9431 19.6819 17.208 19.4866 17.4034C19.2912 17.5987 19.0263 17.7085 18.75 17.7085H16.1458C15.8976 17.7085 15.6574 17.7971 15.4688 17.9585L12.5521 20.4585L10.1146 18.0106C10.0172 17.914 9.90182 17.8377 9.7749 17.7858C9.64799 17.734 9.51209 17.7077 9.375 17.7085H6.25C5.97373 17.7085 5.70878 17.5987 5.51343 17.4034C5.31808 17.208 5.20833 16.9431 5.20833 16.6668V5.2085C5.20833 4.93223 5.31808 4.66728 5.51343 4.47193C5.70878 4.27658 5.97373 4.16683 6.25 4.16683H18.75C19.0263 4.16683 19.2912 4.27658 19.4866 4.47193C19.6819 4.66728 19.7917 4.93223 19.7917 5.2085V16.6668Z" fill="#BDBEC0"/>
</svg>Ställ en fråga</Nav.Link>
</Nav>

                    </Col>



        );
}

export default Sidebar;