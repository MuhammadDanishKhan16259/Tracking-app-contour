import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import aboutSvg from '../assets/AboutSVG.svg'
import '../App.css'


export default function RowAndColumnSpacing() {
  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems:'center',  marginTop:"100px"  }}>
        {/* <div style={{height:'100px', backgroundColor: 'red'}}></div> */}
      <div>
      <Grid container  justifyContent="space-around" alignItems="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{padding:'20px'}}>
        <Grid item xs={7} >
          <h1 style={{fontSize:'42px',margin:"15px ",  fontStyle: 'italic'}}>
            Just <span style={{letterSpacing:'3px', fontWeight:'bolder'}}>BE-FIT</span>
          </h1>
          <p style={{lineHeight:'1.5rem', fontSize:'18px', textAlign:'justify', letterSpacing:'.8px', color:'#202020'}}>
          Welcome to BE-FIT! We are a leading brand dedicated to helping you achieve your fitness goals and maintain a healthy lifestyle. Our innovative fitness tracking platform empowers you to take control of your daily exercise routine.
          <br />
          <br />

With BE-FIT, tracking your workouts has never been easier. Our user-friendly interface allows you to effortlessly log and monitor your exercise activities, whether it's hitting the gym, going for a run, practicing yoga, or engaging in any physical activity. Stay accountable and motivated as you witness your progress unfold right before your eyes.
<br />
<br />

Our comprehensive tracking features enable you to record essential details such as duration, intensity, and calories burned for each workout session. Visualize your achievements through insightful charts and graphs, helping you gain valuable insights into your performance and areas for improvement.
<br />
<br />

But we go beyond just tracking. BE-FIT also offers personalized workout recommendations tailored to your fitness level, goals, and preferences. Our expert-curated exercise plans and routines ensure that you stay challenged and inspired, pushing you towards new heights of fitness success.
<br />
<br />

Connect and engage with a vibrant community of fitness enthusiasts through BE-FIT. Share your accomplishments, participate in challenges, and draw inspiration from others who share your passion for living an active life. Together, we can motivate each other to strive for greatness.
<br />
<br />

Experience the convenience of accessing your exercise data anytime, anywhere, through our seamless mobile app integration. Whether you're on the go or at home, BE-FIT is there to support you every step of the way.
<br />
<br />

Join the BE-FIT community today and embark on a journey towards a healthier, fitter, and more fulfilled you. Start tracking your daily exercise routine and unleash your full potential with BE-FIT. Let's make fitness a way of life!

          </p>
        </Grid>
        <Grid item xs={4}>
          <img src={aboutSvg} className="vert-move" alt="About Us Image" style={{width:'90%', objectFit:'contain'}} />
        </Grid>
      </Grid>
      </div>
    </Box>
  );
}