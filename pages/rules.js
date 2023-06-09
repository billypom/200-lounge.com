import * as React from 'react';

import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Rules.module.css'



export default function Rules() {
  return (
    <div className={styles.container}>
      <Head>
        <title>200 Lounge | Rules</title>
        <meta name="description" content="MK8DX 200cc Lounge Rules" />
        <link rel="icon" href="/200.png" />
      </Head>
      <main className={styles.main}>
        {/* <TileGrid /> */}
        <h1 className={styles.title}>
          rules & about
        </h1>

        <div className="flex flex-col text-center z-10 items-center">
            {/* <h2 className={styles.tier_title}>tier all</h2> */}
            {/* <div className="flex flex-row flex-wrap"> */}
                {/* <div className={styles.records_table}> */}
                    {/* <h3 className="text-3xl font-bold p-2">Rules</h3>   */}
                {/* </div> */}
            {/* </div> */}
            <h2 className={styles.section}>
                WHAT IS 200 LOUNGE?
            </h2>
            <div className={styles.details}>
                200 Lounge is a <a href="https://discord.gg/uR3rRzsjhk">Discord server</a> dedicated to hosting instant wars for MK8DX, while also serving as a community-based server to help increase activity with players and teams in the 200cc community. 12 players can gather and play an event at any time. All other public channels have their own purposes for players and teams outside of lounge events. See channel descriptions in the server for more information on how the channels in the community section should be properly used.​
            </div>



            <h2 className={styles.section}>
                JOINING THE LOUNGE
            </h2>
            <div className={styles.details}>
                <div>
                    Upon joining the server, users must send either their MKCentral forum account or MKCentral registry account using the <b>/verify</b> command in our <a href="https://discord.gg/uR3rRzsjhk">Discord server</a>. For help posting the forum account, a full tutorial on how to do it can be found in the Members section of the <a href="https://discord.gg/uR3rRzsjhk">Discord server</a>. For help making a registry account, refer to <a href="https://www.mariokartcentral.com/wp/mkcentral-registry-guide/">this guide.</a>
                </div>
                <div>
                    Forum example: <a href="https://www.mariokartcentral.com/forums/index.php?members/brandon.94/​">https://www.mariokartcentral.com/forums/index.php?members/brandon.94/</a>
                </div>
                <div>
                    Registry example: <a href="https://www.mariokartcentral.com/mkc/registry/players/171">https://www.mariokartcentral.com/mkc/registry/players/171</a>
                </div>
            </div>

            <div className={styles.details}>
                <div>
                    If you would like a specific nickname for the scoreboard and Discord server, you can request a name change once every 60 days. You can request nickname changes by using the <b>/name</b> command in the Discord server.
                </div>
            </div>

            <div className={styles.details}>
                Making an alternate account to join lounge will result in a heavy penalty in lounge and MKCentral. MKCentral Staff will find out if an alternate account is made, so it is highly recommended to not do so.
            </div>




            <h2 className={styles.section}>
                COMMUNITY AND LOUNGE CONDUCT
            </h2>

            <div className={styles.details}>
                Players who consistently cause disruptions in the server such as trolling, flaming, spamming bot commands, etc. will either receive a chat restriction (only allowing them to send certain messages), or a mute. Using offensive slurs or language against a certain individual or individuals can also result in one of the aforementioned consequences.​
            </div>
            <div className={styles.details}>
                The MEE6 bot is programmed to warn users about using harsh words or phrases by deleting the message and DMing the user. If a user is warned 3 times within 30 minutes, they will be muted from the server for two hours.​
            </div>
            <div className={styles.details}>
                If you ever witness or experience harassment from anyone in this server, please report it to 200 Lounge Staff, either through DMs or a support ticket, which can be found in #support. We highly recommend contacting MKCentral staff as well if it is serious enough.​
            </div>




            <h2 className={styles.section}>
                RANKING SYSTEM
            </h2>
            <div className={styles.details}>
                Once your account is verified, you will be able to play your first match which will place you into one of the following ranks:​
            </div>
            <ul>
                Iron: 0-1499 (Placement: 1000)
            </ul>
            <ul>
                Bronze: 1500-2999 (Placement: 2250)
            </ul>
            <ul>
                Silver: 3000-4499 (Placement: 3750)
            </ul>
            <ul>
                Gold: 4500-5999 (Placement: 5250)
            </ul>
            <ul>
                Platinum: 6000-7499 (Promotion-based)
            </ul>
            <ul>
                Diamond: 7000-8999 (Promotion-based)
            </ul>
            <ul>
                Master: 9000-11000 (Promotion-based)
            </ul>
            <ul>
                Grandmaster: 11000+ (Promotion-based)
            </ul>

            <div className={styles.details}>
                If you are unhappy with your placement or feel that you should have been placed higher or lower, then prove it by playing matches. The system will correct itself quite quickly if you deserve a higher grouping.​
            </div>
            <div className={styles.details}>
                Depending on your rank, you will see a few channels that you can play matches in, listed below:
            </div>
            <ul>
                Tier A: Grandmaster + Master + Diamond + Platinum + Gold
            </ul>
            <ul>
                Tier B: Gold + Silver + Bronze
            </ul>
            <ul>
                Tier C: Silver + Bronze + Iron + Placement
            </ul>
            <ul>
                Tier All: Everyone
            </ul>



            <div className={styles.section}>
                STARTING AN EVENT
            </div>

            <div className={styles.details}>
                Using MogiBot, the first twelve players to say <b>/can</b> or <b>/c</b> will play. Any players later than 12th on the list will be subs, given priority by their order on the list. If a player is unable to sub when needed or does not respond within 5 minutes, they will receive a -50 penalty and a strike.​
            </div>

            <div className={styles.details}>
                The next player in the MogiBot lineup will always have priority when subbing into an event; if a different player subs in when the next player in the MogiBot lineup is able to play, they will receive -50 MMR and a strike.​
            </div>

            <div className={styles.details}>
                A <b>/can</b> will automatically expire after 30 minutes have passed. A list of players can be found using <b>/list</b>.​
            </div>

            <div className={styles.details}>
                Players are not allowed to type <b>/c</b> while already participating in a mogi. Players who violate this rule will receive -50 MMR and a strike.​
            </div>

            <div className={styles.details}>
                After 8 races have passed in the current mogi, users not currently playing are allowed to start a new mogi by typing <b>/esn</b>.​
            </div>

            <div className={styles.details}>
                Once lineups are gained, voting will be used to decide on the format. The first twelve players who originally said <b>/can</b> are allowed to vote. Anyone who is not apart of the original 12 in the line-up will not be counted in the vote.​
            </div>

            <div className={styles.details}>
                Players who drop for any reason after the poll has been started will receive a -100 MMR strike.​
            </div>

            <div className={styles.details}>
                If the event is an FFA, only a host will be needed and the event can start immediately.​
            </div>

            <div className={styles.details}>
                If the event is a 2v2, 3v3, or a 4v4 mogi, teams will be randomized.​
            </div>

            <div className={styles.details}>
            Once teams are randomized, they are final and cannot be changed.​
            </div>

            <div className={styles.details}>
                In the event of an error with the voting bot, where players are forced to manually randomize teams: the list which appears first will be the official teams. Players who force another list will receive -50 MMR and a strike.​
            </div>

            <div className={styles.details}>
                If there is no host for a mogi 20 minutes after the poll ends, the entire lineup will receive -50 and a strike.​
            </div>

            <div className={styles.details}>
                Once a host has been decided, the host must wait 2 minutes after posting their friend code to accept friend requests before opening the room. If the room is opened early, the late penalty comes into effect after 7 minutes of the friend code being posted. Should players request the room to be reopened if opened early, the host must do so or else receive 1 strike.​
            </div>

            <div className={styles.section}>
                MATCH RULES
            </div>

            <div className={styles.details}>
                Once a room has been opened, players will have 5 minutes to join the room.​
            </div>

            <div className={styles.details}>
                If a player seems to be purposefully delaying the room, they can be subbed out. This would hold the same consequences as dropping from the line-up after poll.​
            </div>

            <div className={styles.details}>
                If a player continues to abuse the 10 minutes on a regular basis, staff have the right to temporarily restrict them from lounge events.​
            </div>

            <div className={styles.details}>
                Players that join the room late will receive a -50 MMR strike.​
            </div>

            <div className={styles.details}>
                If a player still has not joined the room 5 minutes after the penalty time, they will receive -100 and a strike and must be replaced by a sub as soon as possible. The mogi should not be started with less than 12 players under any condition.
            </div>

            <div className={styles.details}>
                
            </div>

            <div className={styles.details}>
                
            </div>

            <div className={styles.details}>
                
            </div>

            <div className={styles.details}>
                
            </div>

            <div className={styles.details}>
                
            </div>

            <div className={styles.details}>
                
            </div>

            <div className={styles.details}>
                
            </div>

            <div className={styles.details}>
                
            </div>

            <div className={styles.details}>
                
            </div>

            <div className={styles.details}>
                
            </div>

            <div className={styles.details}>
                
            </div>

            <div className={styles.details}>
                
            </div>

            <div className={styles.details}>
                
            </div>

            <div className={styles.details}>
                
            </div>

            <div className={styles.details}>
                
            </div>

            <div className={styles.details}>
                
            </div>

            <div className={styles.details}>
                
            </div>

            <div className={styles.details}>
                
            </div>

            <div className={styles.details}>
                
            </div>

            <div className={styles.details}>
                
            </div>

            <div className={styles.details}>
                
            </div>

            <div className={styles.details}>
                
            </div>

            <div className={styles.details}>
                
            </div>

            <div className={styles.details}>
                
            </div>

            <div className={styles.details}>
                
            </div>

            <div className={styles.details}>
                
            </div>

            <div className={styles.details}>
                
            </div>

            <div className={styles.details}>
                
            </div>
























        </div>
      </main>
    </div>
  );
}