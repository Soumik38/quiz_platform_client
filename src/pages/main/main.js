
import Header from "../header/header"
import Footer from "../footer/footer"
import { Timeline} from 'react-twitter-widgets'
import { useNavigate } from "react-router-dom"
import { useState,useEffect } from "react"
import dropDown from '../../assets/drop-down.png'
import dropUp from '../../assets/drop-up.png'
import './main.css'
const Main=()=>{
    const nav=useNavigate()
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    useEffect(() => {
        setEmail(localStorage.getItem('myEmail') ||'')
        
        fetch(`https://quiz-platform-server.onrender.com/user/${email}`)
          .then(response => response.json())
          .then(data => {
            if (data.error) {
              console.error(data.error);
            } else {
              setName(data.name);
            }
        })
        .catch(error => console.error('Error fetching user by email:', error));
            localStorage.setItem('myName', JSON.stringify(name))
        }, [name,email])


    const [mobile, setMobile] = useState(false);
    const toggleMobile = () => {
        setMobile(!mobile);
    };
    const [hardware, setHardware] = useState(false);
    const toggleHardware = () => {
        setHardware(!hardware);
    };
    const [web, setWeb] = useState(false);
    const toggleWeb = () => {
        setWeb(!web);
    };


    return(<>
    {localStorage.getItem('loggedin')==='true'? <Header page='login'/> : <Header login={false}/>}
        <div className="top">
            {localStorage.getItem('loggedin')==='true'?<div className="view">
                <div className="master-container">
                    <div className="q-container">
                        <h1>Welcome <span className="user-name">{name}</span></h1>
                        <button className='login-button' onClick={()=>nav('/dashboard')}>Take Quiz</button>
                    </div>
                    <div className="timeline">
                        <Timeline dataSource={{sourceType: 'profile',screenName: 'TheCyberSecHub'}} options={{height: '450',width:'600'}}/>
                    </div>
                </div>
                <div className="awareness">
                    <h2>Awareness</h2>
                    <div>
                        <div className="drop-down-menu" onClick={toggleMobile}>
                            <h3>Mobile Security  </h3>
                            {mobile?<img src={dropUp} />:<img src={dropDown} />}
                        </div>
                        {mobile && <ol>
                            <li><strong>Keep Your OS and Apps Updated:</strong> Regularly update your mobile operating system and apps to patch security vulnerabilities and get the latest features.</li>
                            <li><strong>Use Strong Passwords and Biometric Authentication:</strong> Enable strong passwords, PINs, or biometric authentication (fingerprint, facial recognition) to secure your device.</li>
                            <li><strong>Install Apps from Trusted Sources:</strong> Only download and install apps from official app stores (e.g., Google Play Store, Apple App Store) to reduce the risk of malware.</li>
                            <li><strong>Use Mobile Security Software:</strong> Install and regularly update mobile security apps to protect against malware, phishing, and other threats.</li>
                            <li><strong>Enable Remote Wipe and Find My Device:</strong> Activate remote wipe and device locator services to find your phone or erase its data if it is lost or stolen.</li>
                            <li><strong>Encrypt Your Data:</strong> Enable data encryption on your mobile device to protect sensitive information from unauthorized access.</li>
                            <li><strong>Be Cautious with Public Wi-Fi:</strong> Avoid accessing sensitive information over public Wi-Fi networks. Use a VPN for secure connections when necessary.</li>
                            <li><strong>Regularly Backup Your Data:</strong> Regularly back up your mobile data to ensure you can restore it in case of loss, theft, or damage.</li>
                            <li><strong>Monitor App Permissions:</strong> Regularly review and manage app permissions to ensure apps only have access to necessary data and features.</li>
                            <li><strong>Be Wary of Phishing Attacks:</strong> Be cautious of suspicious links, messages, and emails. Avoid clicking on links or downloading attachments from unknown sources.</li>
                            <li><strong>Disable Unnecessary Features:</strong> Turn off Bluetooth, NFC, and other connectivity features when not in use to reduce the risk of unauthorized access.</li>
                        </ol>}
                    </div>
                    <div>
                        <div className="drop-down-menu" onClick={toggleWeb}>
                            <h3>Web Security  </h3>
                            {web?<img src={dropUp} />:<img src={dropDown} />}
                        </div>
                        {web && <ol>
                            <li><strong>Keep Your Browser Updated:</strong> Regularly update your browser to ensure you have the latest security patches and features.</li>
                            <li><strong>Use Strong, Unique Passwords:</strong> Use strong, unique passwords for different websites and services. Consider using a reputable password manager.</li>
                            <li><strong>Enable Two-Factor Authentication (2FA):</strong> Enable 2FA on websites and services that support it for an added layer of security.</li>
                            <li><strong>Install Browser Security Extensions:</strong> Use security extensions like ad blockers, anti-phishing tools, and script blockers to enhance your browser security.</li>
                            <li><strong>Beware of Phishing Scams:</strong> Be cautious of suspicious links, emails, and messages. Verify the authenticity of the source before clicking on links or providing personal information.</li>
                            <li><strong>Clear Browser Cache and Cookies Regularly:</strong> Regularly clear your browser's cache and cookies to protect your privacy and reduce the risk of session hijacking.</li>
                            <li><strong>Use HTTPS:</strong> Ensure that the websites you visit use HTTPS to encrypt the data transmitted between your browser and the website.</li>
                            <li><strong>Disable Autofill for Sensitive Information:</strong> Disable the autofill feature for sensitive information like credit card numbers and passwords to prevent unauthorized access.</li>
                            <li><strong>Manage Browser Permissions:</strong> Regularly review and manage the permissions granted to websites, such as location, camera, and microphone access.</li>
                            <li><strong>Enable Privacy Settings:</strong> Adjust your browser's privacy settings to limit tracking and data collection by websites and advertisers.</li>
                            <li><strong>Regularly Backup Your Data:</strong> Regularly back up your browser data, including bookmarks and passwords, to avoid data loss in case of a security breach or device failure.</li>
                        </ol>}
                    </div>
                    <div>
                        <div className="drop-down-menu" onClick={toggleHardware}>
                            <h3>Hardware Security  </h3>
                            {hardware?<img src={dropUp} />:<img src={dropDown} />}
                        </div>
                        {hardware && <ol>
                            <li><strong>Keep Firmware Updated:</strong> Regularly update the firmware of all hardware devices to patch vulnerabilities and improve security features.</li>
                            <li><strong>Secure Physical Access:</strong> Restrict physical access to sensitive hardware to prevent unauthorized tampering or theft.</li>
                            <li><strong>Use Hardware Encryption:</strong> Utilize hardware-based encryption modules to protect sensitive data at rest and in transit.</li>
                            <li><strong>Implement BIOS/UEFI Security:</strong> Enable BIOS/UEFI passwords and secure boot features to protect against unauthorized changes and boot-level malware.</li>
                            <li><strong>Network Segmentation:</strong> Segment your network to isolate critical hardware components, reducing the risk of widespread compromise.</li>
                            <li><strong>Monitor Hardware Health:</strong> Regularly check the health and status of hardware components to detect any anomalies or signs of compromise.</li>
                            <li><strong>Disable Unused Ports:</strong> Disable unused physical ports (e.g., USB, Ethernet) to prevent unauthorized devices from being connected.</li>
                            <li><strong>Use Trusted Hardware:</strong> Purchase hardware from reputable vendors and ensure it has not been tampered with before deployment.</li>
                            <li><strong>Implement Device Authentication:</strong> Use device authentication mechanisms to ensure only authorized devices can connect to the network.</li>
                            <li><strong>Backup Critical Hardware Configurations:</strong> Regularly backup the configurations of critical hardware components to enable quick recovery in case of failure or compromise.</li>
                            <li><strong>Conduct Regular Audits:</strong> Perform regular security audits of hardware components to identify and address potential vulnerabilities.</li>
                        </ol>}
                    </div>
                </div>
            </div>
            :
            <div className="view">
            <h1>Welcome to the  <span className="user-name">Cyber-Security Awareness Platform</span></h1>
                <h3>Sign In or Sign Up to get started</h3>
                <div className="signinup">
                    <button className='login-button' onClick={()=>nav('/signin')}>Sign In</button>
                    <button className='login-button' onClick={()=>nav('/signup')}>Sign Up</button>
                </div>
            </div>}
        </div>
        
    <Footer/>
    </>)
}
export default Main 