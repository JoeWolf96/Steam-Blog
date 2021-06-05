import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

const SteamView = (props)=>{
  console.log(props.steam.applist.apps)

  const steamSliced= props.steam.applist.apps.slice(300,350)
  console.log(steamSliced)
    return (
      <PerfectScrollbar>
      <div className="table">
      <table>
          <tbody>

              {steamSliced.map(steam => {

                return(
                  <tr key={steam.appid} >
                  <tr>{steam.name}</tr>

                 </tr>

              )




                  })
              }
          </tbody>

      </table>
      </div>
      </PerfectScrollbar>


)
    }

export default SteamView;
