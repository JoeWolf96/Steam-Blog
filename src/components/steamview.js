import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import TableScrollbar from 'react-table-scrollbar';

const SteamView = (props)=>{
  console.log(props.steam.applist.apps)

  const steamSliced= props.steam.applist.apps.slice(0,10000)

    return (
      <TableScrollbar rows={15}>
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
      </TableScrollbar>


)
    }

export default SteamView;
