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
                        200 Lounge is a <a href="https://discord.gg/uR3rRzsjhk">Discord server</a> dedicated to hosting instant wars for MK8DX, while also serving as a community-based server to help increase activity with players and teams in the 200cc community. 12 players can gather and play an event at any time. All other public channels have their own purposes for players and teams outside of lounge events. See channel descriptions in the server for more information on how the channels in the community section should be properly used.
                    </div>



                    <h2 className={styles.section}>
                        JOINING THE LOUNGE
                    </h2>
                    <div className={styles.details}>
                        <div>
                            Upon joining the server, users must send either their MKCentral forum account or MKCentral registry account using the <b>/verify</b> command in our <a href="https://discord.gg/uR3rRzsjhk">Discord server</a>. For help posting the forum account, a full tutorial on how to do it can be found in the Members section of the <a href="https://discord.gg/uR3rRzsjhk">Discord server</a>. 
                        </div>
                        <div>
                            For help making a registry account, refer to <a href="https://www.mariokartcentral.com/wp/mkcentral-registry-guide/">this guide.</a>
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
                        Players who consistently cause disruptions in the server such as trolling, flaming, spamming bot commands, etc. will either receive a chat restriction (only allowing them to send certain messages), or a mute. Using offensive slurs or language against a certain individual or individuals can also result in one of the aforementioned consequences.
                    </div>
                    <div className={styles.details}>
                        The MEE6 bot is programmed to warn users about using harsh words or phrases by deleting the message and DMing the user. If a user is warned 3 times within 30 minutes, they will be muted from the server for two hours.
                    </div>
                    <div className={styles.details}>
                        If you ever witness or experience harassment from anyone in this server, please report it to 200 Lounge Staff, either through DMs or a support ticket, which can be found in #support. We highly recommend contacting MKCentral staff as well if it is serious enough.
                    </div>




                    <h2 className={styles.section}>
                        RANKING SYSTEM
                    </h2>
                    <div className={styles.details}>
                        Once your account is verified, you will be able to play your first match which will place you into one of the following ranks:
                    </div>
                    <div className={styles.list}>
                        <ul>
                            <p className='text-stone-500 inline-block'>Iron: 0-1499</p> (Placement: 1000)
                        </ul>
                        <ul>
                        <p className='text-orange-400 inline-block'>Bronze: 1500-2999</p> (Placement: 2250)
                        </ul>
                        <ul>
                        <p className='text-gray-400 inline-block'>Silver: 3000-4499</p> (Placement: 3750)
                        </ul>
                        <ul>
                        <p className='text-yellow-500 inline-block'>Gold: 4500-5999</p> (Placement: 5250)
                        </ul>
                        <ul>
                        <p className='text-cyan-600 inline-block'>Platinum: 6000-7499</p> (Promotion-based)
                        </ul>
                        <ul>
                        <p className='text-cyan-200 inline-block'>Diamond: 7000-8999</p> (Promotion-based)
                        </ul>
                        <ul>
                        <p className='text-violet-700 inline-block'>Master: 9000-11000</p> (Promotion-based)
                        </ul>
                        <ul>
                        <p className='text-red-800 inline-block'>Grandmaster: 11000+</p> (Promotion-based)
                        </ul>
                    </div>

                    <div className={styles.details}>
                        Depending on your final score and which tier you first played in, you will be placed at a certain rank as described below:
                    </div>

                    <div className={styles.list}>
                        <ul className='text-lg underline'>
                            Tier C
                        </ul>
                        <ul>
                        <p className='text-stone-500 inline-block'>Iron: 12-59</p>
                        </ul>
                        <ul>
                        <p className='text-orange-400 inline-block'>Bronze: 60-89</p>
                        </ul>
                        <ul>
                        <p className='text-gray-400 inline-block'>Silver: 90-119</p>
                        </ul>
                        <ul>
                        <p className='text-yellow-500 inline-block'>Gold: 120+</p>
                        </ul>
                        <ul className='text-lg underline pt-5'>
                            Tier All
                        </ul>
                        <ul>
                        <p className='text-stone-500 inline-block'>Iron: 12-49</p>
                        </ul>
                        <ul>
                        <p className='text-orange-400 inline-block'>Bronze: 50-79</p>
                        </ul>
                        <ul>
                        <p className='text-gray-400 inline-block'>Silver: 80-109</p>
                        </ul>
                        <ul>
                        <p className='text-yellow-500 inline-block'>Gold: 110+</p>
                        </ul>

                    </div>

                    <div className={styles.details}>
                        If you are unhappy with your placement or feel that you should have been placed higher or lower, then prove it by playing matches. The system will correct itself quite quickly if you deserve a higher grouping.
                    </div>
                    <div className={styles.details}>
                        Depending on your rank, you will see a few channels that you can play matches in, listed below:
                    </div>
                    <div className={styles.list}>
                        <ul>
                            Tier A: <p className='text-red-800 inline-block'>Grandmaster</p> + <p className='text-violet-700 inline-block'>Master</p> + <p className='text-cyan-200 inline-block'>Diamond</p> + <p className='text-cyan-600 inline-block'>Platinum</p> + <p className='text-yellow-500 inline-block'>Gold</p>
                        </ul>
                        <ul>
                            Tier B: <p className='text-yellow-500 inline-block'>Gold</p> + <p className='text-gray-400 inline-block'>Silver</p> + <p className='text-orange-400 inline-block'>Bronze</p>
                        </ul>
                        <ul>
                            Tier C: <p className='text-gray-400 inline-block'>Silver</p> + <p className='text-orange-400 inline-block'>Bronze</p> + <p className='text-stone-500 inline-block'>Iron</p> + Placement
                        </ul>
                        <ul>
                            Tier All: <p className='text-green-300 inline-block'>Everyone</p>
                        </ul>
                    </div>



                    <div className={styles.section}>
                        STARTING AN EVENT
                    </div>

                    <div className={styles.details}>
                        Using MogiBot, the first twelve players to say <b>/can</b> or <b>/c</b> will play. Any players later than 12th on the list will be subs, given priority by their order on the list. If a player is unable to sub when needed or does not respond within 5 minutes, they will receive a <penalty>-50 penalty and a strike</penalty>.
                    </div>

                    <div className={styles.details}>
                        The next player in the MogiBot lineup will always have priority when subbing into an event; if a different player subs in when the next player in the MogiBot lineup is able to play, they will receive <penalty>-50 MMR and a strike</penalty>.
                    </div>

                    <div className={styles.details}>
                        A <b>/can</b> will automatically expire after 30 minutes have passed. A list of players can be found using <b>/list</b>.
                    </div>

                    <div className={styles.details}>
                        Players are not allowed to type <b>/c</b> while already participating in a mogi. Players who violate this rule will receive <penalty>-50 MMR and a strike.</penalty>
                    </div>

                    <div className={styles.details}>
                        After 8 races have passed in the current mogi, users not currently playing are allowed to start a new mogi by typing <b>/esn</b>.
                    </div>

                    <div className={styles.details}>
                        Once lineups are gained, voting will be used to decide on the format. The first twelve players who originally said <b>/can</b> are allowed to vote. Anyone who is not apart of the original 12 in the line-up will not be counted in the vote.
                    </div>
                    <div className={styles.list}>
                        <ul>
                            - Players who drop for any reason after the poll has been started will receive a <penalty>-100 MMR and a strike.</penalty>
                        </ul>

                        <ul>
                            - If the event is an FFA, only a host will be needed and the event can start immediately.
                        </ul>

                        <ul>
                            - If the event is a 2v2, 3v3, or a 4v4 mogi, teams will be randomized.
                        </ul>

                        <ul>
                            - Once teams are randomized, they are final and cannot be changed.
                        </ul>

                        <ul>
                            - In the event of an error with the voting bot, where players are forced to manually randomize teams: the list which appears first will be the official teams. Players who force another list will receive <penalty>-50 MMR and a strike</penalty>.
                        </ul>

                    </div>


                    <div className={styles.details}>
                        If there is no host for a mogi 20 minutes after the poll ends, the entire lineup will receive <penalty>-50 and a strike</penalty>.
                    </div>

                    <div className={styles.details}>
                        Once a host has been decided, the host must wait 2 minutes after posting their friend code to accept friend requests before opening the room. If the room is opened early, the late penalty comes into effect after 7 minutes of the friend code being posted. Should players request the room to be reopened if opened early, the host must do so or else receive <penalty>1 strike.</penalty>
                    </div>

                    <div className={styles.section}>
                        MATCH RULES
                    </div>

                    <div className={styles.details}>
                        Once a room has been opened, players will have 5 minutes to join the room.
                    </div>
                    <div className={styles.list}>
                        <ul>
                            - If a player seems to be purposefully delaying the room, they can be subbed out. This would hold the same consequences as dropping from the line-up after poll.
                        </ul>

                        <ul>
                            - If a player continues to abuse the 10 minutes on a regular basis, staff have the right to temporarily restrict them from lounge events.
                        </ul>
                    </div>

                    <div className={styles.details}>
                        Players that join the room late will receive a <penalty>-50 MMR and a strike</penalty>.
                    </div>

                    <div className={styles.details}>
                        If a player still has not joined the room 5 minutes after the penalty time, they will receive <penalty>-100 and a strike</penalty> and must be replaced by a sub as soon as possible. The mogi should NOT be started with less than 12 players.
                    </div>

                    <div className={styles.details}>
                        Players who sub in a match that has already started:
                    </div>
                    <div className={styles.list}>
                        <ul>
                            - Must be placed on the table instead of the person they subbed.​
                        </ul>
                        <ul>
                            - Do not lose MMR on a losing team.​
                        </ul>
                        <ul>
                            - Only gain MMR on the winning team if they play 4 or more races in said event.​
                        </ul>
                    </div>

                    <div className={styles.details}>
                        Players who repick a course in an FFA will receive a -10 penalty.​
                    </div>

                    <div className={styles.details}>
                        Players who repick a course in team events will receive a -50 MMR penalty.​
                    </div>
                    <div className={styles.list}>
                        <ul>
                            - If a course is repicked more than once (not including random), the player(s) choosing the track will receive a <penalty>strike</penalty> and a <penalty>-100 MMR</penalty> penalty for each time they pick the track. This applies to everyone who attempts to repick, even if the track is not chosen.​
                        </ul>
                    </div>

                    <div className={styles.details}>
                    Players who have an incorrect tag for more than 2 races will receive a -25 MMR penalty.​
                    </div>

                    <div className={styles.details}>
                    Players who leave an event for any reason:​
                    </div>

                    <div className={styles.list}>
                        <ul>
                        - Do not gain MMR on a winning team.​
                        </ul>
                        <ul>
                        - Receive one <penalty>strike and a -100 MMR</penalty> penalty. There are no exceptions to this rule.​
                        </ul>
                        <ul>
                        - Lose any MMR their team lost in addition to the strike.​
                        </ul>
                    </div>

                    <div className={styles.details}>
                    Teams missing a player for at least 4 races will get ⅔ MMR loss. Teams missing a player for at least 6 races will get ½ MMR loss. The missing player will still lose MMR and receive a <penalty>-100 MMR strike</penalty>. Teams missing a player for more than 6 races will receive an MMR loss proportionate to the number of races the missing player is absent from. For instance, if a player is missing for 10 races, the team will receive 2/10 loss. The missing player will still lose MMR and will receive an additional <penalty>-100 MMR + strike</penalty> penalty.​
                    </div>

                    <div className={styles.details}>
                    If any players happen to be intentionally throwing, teaming, or lap-trolling and there is convincing proof, staff has the right to bestow a <penalty>-100 MMR penalty and a strike</penalty> on the individual in question.​
                    </div>

                    <div className={styles.details}>
                    Hosts that start the room with less than 12 players, close the room for no reason, or otherwise cause unnecessary disruptions will receive <penalty>-50 and a strike</penalty>, and may be prohibited from hosting in the future. In a mogi, hosts must take a 30-second clip to prove that it was unintentional (streaming archive is also allowed). Typing !hostban in any channel will show the list of host-banned players.​
                    </div>

                    <div className={styles.details}>
                    In order for an event to count, 12 full races must be completed. If 12 races are not completed, the event will not count.​
                    </div>

                    <div className={styles.section}>
                        DISCONNECTIONS
                    </div>

                    <div className={styles.details}>
                    If 3 or more players from at least 2 different teams disconnect, the race will not count and the room must be reopened.​ The affected players must provide video evidence of their disconnects.
                    </div>

                    <div className={styles.details}>
                    If a race does not finish due to lag, the race will not be counted and the room will be reopened.​ The host should provide video evidence of the disconnect.
                    </div>

                    <div className={styles.details}>
                    If item roulette is prominent for most of a race, the race will not count and the room must be reopened.​
                    </div>

                    <div className={styles.details}>
                    If no races can be finished for an extended amount of time due to lag, the event can be canceled with no players losing MMR.​
                    </div>

                    <div className={styles.details}>
                    If this happens to occur during an event, please attempt to capture video proof of the individual who may be causing the lag in the room. If the proof is convincing, and if the majority of the room agrees on who is causing the lag, staff have the right to punish the individual for a certain amount of time, or warn them to fix their connection before playing again.​
                    </div>

                    <div className={styles.section}>
                        STRIKE SYSTEM
                    </div>

                    <div className={styles.details}>
                        Players who receive MMR penalties for quitting matches, lap-trolling, joining the room late, or teaming will also receive a strike. Strikes expire after 30 days. Players have a limit of three strikes.​
                    </div>

                    <div className={styles.details}>
                        Players who reach 3 strikes will be banned from Lounge for 1 week. Each time the strike limit is reached, the ban will increase by an additional week.
                    </div>

                    <div className={styles.section}>
                        RESULTS
                    </div>

                    <div className={styles.details}>
                        Submit a table using the <b>/table</b> command. Provide a format (1, 2, 3, or 4) and a list of 12 players & 12 scores, alternating. A proper command will look something like this: <b>/table 2 Brandon 76 popuko 80+5 Technical 93 Euan 141 Nino 102 mktristan 73 Cynda 87 Vike 70 Francis 92 Joshua 49 Jakearoo 76 AlexYT 40</b>. If there is an issue with your command, our Discord bot should inform you of what is causing the error.
                    </div>

                    <div className={styles.details}>
                        Any penalties that occurred during the match must also be stated by the reporter posting the table.​
                    </div>

                    <div className={styles.details}>
                        Room hosts are responsible for taking screenshots of results. If an event fails to have a screenshot or table posted within 24 hours, the host of the room will receive <penalty>-100 and a strike</penalty>.​
                    </div>

                    <div className={styles.details}>
                        Only certain people will be given access to the results channels in order to prevent spam. If you want to become a reporter, look in the <a href="https://discord.gg/uR3rRzsjhk">#self-roles</a> channel in the Discord server
                    </div>

                    <div className={styles.section}>
                        SQUAD QUEUE
                    </div>

                    <div className={styles.details}>
                    Squad Queue is a different way of playing lounge that allows players to play with predetermined teammates.​
                    </div>

                    <div className={styles.details}>
                        If a player fails to show up for a match, misses at least half of an event, or trolls during an event (IV. h, IV. j) they will receive <penalty>-100 MMR and a strike</penalty>.
                    </div>

                    <div className={styles.details}>
                    Subs are allowed in Squad Queue events; however, the sub&apos;s MMR must keep their team&apos;s average MMR within the range of the room. In other words, if a team would be in a different room if their team MMR was different, then the sub is not allowed.​
                    </div>

                    <div className={styles.details}>
                    If a team gets a sub which would put their average MMR in a different room, the whole team will receive <penalty>-50 and a strike</penalty> at minimum. If the team wins more than 50 MMR, the penalty will be increased to match the amount of MMR they would have gained.​
                    </div>

                    <div className={styles.details}>
                    If the host has been decided after opening time, the host has to wait 2 minutes to open the room. Players need to be in the room in 5 minutes. After 10 minutes, the host can start Mogi even if there are not 12 players in the room.​
                    </div>

                    <div className={styles.section}>
                    CONCLUSION
                    </div>

                    <div className={styles.details}>
                    That is all that we are expecting each and every one of you to follow. We hope you enjoy your community and lounge experience and follow the rules and guidelines accordingly.​
                    </div>
                </div>
            </main>
        </div>
    );
}