import Head from 'next/head'
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
                <h1 className={`${styles.title} text-zinc-900 dark:text-white`}>
                    rules & about
                </h1>

                <div className="flex flex-col z-10 items-center">

                    <div className='text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75 m-1 border border-solid rounded-lg'>
                        <h2 className={`${styles.section}`}>
                            I. WHAT IS 200 LOUNGE?
                        </h2>
                        <div className={`${styles.details}`}>
                            200 Lounge is a <a href="https://discord.gg/uR3rRzsjhk">Discord server</a> dedicated to hosting instant wars for MK8DX, while also serving as a community-based server to help increase activity with players and teams in the 200cc community. 12 players can gather and play an event at any time. All other public channels have their own purposes for players and teams outside of lounge events. See channel descriptions in the server for more information on how the channels in the community section should be properly used.
                        </div>
                    </div>


                    <div className='text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75 m-1 border border-solid rounded-lg'>
                        <h2 className={`${styles.section} text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75`}>
                            II. JOINING THE LOUNGE
                        </h2>
                        <div className={`${styles.details} text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75`}>
                            Use the <b>/verify</b> command in our <a href="https://discord.gg/uR3rRzsjhk">Discord server</a> to provide the leaderboard system with your <a href="https://www.mariokartcentral.com/mkc/">Mario Kart Central</a> account.
                        </div>
                        <div className={`${styles.details} text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75`}>
                            A tutorial video on how to do this can be found in the <a href="https://discord.gg/uR3rRzsjhk">#verification</a> channel in the Discord server.
                        </div>
                        <div className={`${styles.details} text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75`}>
                            For help making a registry account, refer to <a href="https://www.mariokartcentral.com/wp/mkcentral-registry-guide/">this guide.</a>
                        </div>
                        {/* <div className={`${styles.details} text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75`}>
                            Forum example: <a href="https://www.mariokartcentral.com/forums/index.php?members/brandon.94/​">https://www.mariokartcentral.com/forums/index.php?members/brandon.94/</a>
                        </div> */}
                        {/* <div className={`${styles.details} text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75`}>
                            Registry example: <a href="https://www.mariokartcentral.com/mkc/registry/players/171">https://www.mariokartcentral.com/mkc/registry/players/171</a>
                        </div> */}

                        <div className={`${styles.details} text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75`}>
                            <div>
                                You can request nickname, once every 60 days, by using the <b>/name</b> command in the Discord server.
                            </div>
                        </div>

                        <div className={`${styles.details} text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75`}>
                            Making an alternate account to join lounge will result in a heavy penalty in lounge and MKCentral. MKCentral Staff will find out if an alternate account is made, so it is highly recommended to not do so.
                        </div>
                    </div>







                    <div className='text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75 m-1 border border-solid rounded-lg'>
                        <h2 className={`${styles.section} text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75`}>
                            III. COMMUNITY AND LOUNGE CONDUCT
                        </h2>

                        <div className={`${styles.details} text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75`}>
                            Players who consistently cause disruptions in the server such as trolling, flaming, spamming bot commands, etc. will either receive a chat restriction (only allowing them to send certain messages), or a mute. Using offensive slurs or language against a certain individual or individuals can also result in one of the aforementioned consequences.
                        </div>
                        <div className={`${styles.details} text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75`}>
                            The MEE6 bot is programmed to warn users about using harsh words or phrases by deleting the message and DMing the user. If a user is warned 3 times within 30 minutes, they will be muted from the server for two hours.
                        </div>
                        <div className={`${styles.details} text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75`}>
                            If you ever witness or experience harassment from anyone in this server, please report it to 200 Lounge Staff, either through DMs or a support ticket, which can be found in #support. We highly recommend contacting MKCentral staff as well if it is serious enough.
                        </div>
                    </div>



                    <div className='text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75 m-1 border border-solid rounded-lg'>
                        <h2 className={`${styles.section} text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75`}>
                            IV. RANKING SYSTEM
                        </h2>
                        <div className={`${styles.details} text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75`}>
                            Once your account is verified, you will be able to play your first match which will place you into one of the following ranks:
                        </div>
                        <div className={`${styles.list} text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75`}>
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
                                <p className='dark:text-cyan-600 text-cyan-900 inline-block'>Platinum: 6000-7499</p> (Promotion-based)
                            </ul>
                            <ul>
                                <p className='dark:text-cyan-200 text-cyan-500 inline-block'>Diamond: 7500-8999</p> (Promotion-based)
                            </ul>
                            <ul>
                                <p className='text-violet-700 inline-block'>Master: 9000-11000</p> (Promotion-based)
                            </ul>
                            <ul>
                                <p className='text-red-800 inline-block'>Grandmaster: 11000+</p> (Promotion-based)
                            </ul>
                        </div>

                        <div className={`${styles.details} text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75`}>
                            Depending on your final score and which tier you first played in, you will be placed at a certain rank as described below:
                        </div>

                        <div className={`${styles.list} text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75`}>
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

                        <div className={`${styles.details} text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75`}>
                            If you are unhappy with your placement or feel that you should have been placed higher or lower, then prove it by playing matches. The system will correct itself quite quickly if you deserve a higher grouping.
                        </div>
                        <div className={`${styles.details} text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75`}>
                            Depending on your rank, you will see a few channels that you can play matches in, listed below:
                        </div>
                        <div className={`${styles.list} text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75`}>
                            <ul>
                                Tier A: <p className='text-red-800 inline-block'>Grandmaster</p> + <p className='text-violet-700 inline-block'>Master</p> + <p className='dark:text-cyan-200 text-cyan-500 inline-block'>Diamond</p> + <p className='dark:text-cyan-600 text-cyan-900 inline-block'>Platinum</p> + <p className='text-yellow-500 inline-block'>Gold</p>
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
                    </div>


















                    <div className='text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75 m-1 border border-solid rounded-lg'>
                        <div className={`${styles.section} text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75`}>
                            V. JOINING AN EVENT
                        </div>


                        <div className={`${styles.details} text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75`}>
                            <ul className='m-4'>
                                1. Go to the <c>#tier</c> channels under the Lounge section of the Discord server
                            </ul>
                            <ul className='m-4'>
                                2. Use the <b>/start</b> command to start the mogi.
                            </ul>
                            <ul className='m-4'>
                                3. Use the <b>/can</b> command to join the mogi
                            </ul>
                            <ul className='m-4'>
                                4. The first twelve players to say <b>/can</b> or <b>/c</b> will play.
                                Any players later than 12th on the list will be subs, given priority by their order on the list.
                            </ul>

                            <ul className='m-4'>
                                5. Once 12 players have gathered, voting will be used to decide on the format. To vote, type the number that matches the format you want to vote for. The bot will not process votes outside of the original 12 players.
                            </ul>

                            <ul className='m-4'>
                                6. After the voting phase, teams will be randomly assigned between these formats: FFA, 2v2, 3v3, 4v4.
                            </ul>

                            <ul className='m-4'>
                                7. If <c>MogiBot</c> is offline, players may randomize teams through other means (RandomBot, random.org). The list which appears first will be the official teams. Players who force another list will receive <penalty>-50 MMR and a strike</penalty>.
                            </ul>

                            <ul className='m-4'>
                                8. Lounge events take place in Friend Rooms. Once the teams have been randomized, a host will need to provide their <c>Friend Code</c>.
                            </ul>

                            <ul className='m-4'>
                                9. If there is no host for a mogi 20 minutes after the poll ends, the entire lineup will receive <penalty>-50 and a strike</penalty>.
                            </ul>

                            <ul className='m-4'>
                                10. Hosts must wait 2 minutes after posting their friend code before opening the room to accept friend requests. Other players may request the room to be reopened, if the room was opened early. Refusal will incur <penalty>1 strike</penalty> to the host.
                            </ul>

                            <ul className='m-4'>
                                11. Players who drop for any reason after the poll has been started will receive a <penalty>-100 MMR and a strike.</penalty>
                            </ul>

                            <ul className='m-4'>
                                12. If a player is unable to sub when needed or does not respond within 5 minutes, they will receive a <penalty>-50 penalty and a strike</penalty>.
                            </ul>

                            <ul className='m-4'>
                                13. Players who ignore the order of sub priority will receive <penalty>-50 MMR and a strike</penalty>.
                            </ul>








                            <ul className='m-4'>
                                12. After 8 races have passed in the current mogi, users not currently playing are allowed to start a new mogi by typing <b>/esn</b> (esn = end start new).
                            </ul>



                        </div>
                    </div>


















                    <div className='text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75 border border-solid rounded-lg'>
                        
                            <div className={`${styles.section} text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75`}>
                                VI. MATCH RULES
                            </div>
                            <div className={`${styles.details} text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75`}>
                            <ul className='m-4'>
                                1. Once a room has been opened, players will have 5 minutes to join the room. Players that join the room late will receive a <penalty>-50 MMR and a strike</penalty>.
                            </ul>

                            <ul className='m-4'>
                                2. Players who do not join the room 5 minutes after the penalty time will receive <penalty>-100 and a strike</penalty> (V.11) and must be replaced by a sub as soon as possible. The mogi should NOT be started with less than 12 players.
                            </ul>

                            <ul className='m-4'>
                                3. If a player seems to be purposefully delaying the room, they can be subbed out. This would hold the same consequences as dropping from the line-up after poll.
                            </ul>

                            <ul className='m-4'>
                                4. Players who leave an event after the poll has started:
                            </ul>

                            <ul className='m-4 ml-10'>
                                A. Do not gain MMR on a winning team.
                            </ul>
                            <ul className='m-4 ml-10'>
                                B. Receive <penalty>1 strike</penalty> and a <penalty>-100 MMR</penalty> penalty.
                            </ul>
                            <ul className='m-4 ml-10'>
                                C. Lose any MMR their team lost in addition to the strike.
                            </ul>

                            <ul className='m-4'>
                                5. Players who sub in a match that has already started:
                            </ul>

                            <ul className='m-4 ml-10'>
                                A. Must be placed on the table instead of the person they subbed.
                            </ul>

                            <ul className='m-4 ml-10'>
                                B. Do not lose MMR on a losing team.
                            </ul>

                            <ul className='m-4 ml-10'>
                                C. Only gain MMR on the winning team if they play 4 or more races in said event.
                            </ul>

                            <ul className='m-4 ml-10'>
                                D. In a situation where placing a sub on a table results in -MMR and placing the dropped player on the table results in +MMR, the player who played more races should be listed on the table.
                            </ul>

                            <ul className='m-4 ml-10'>
                                E. In the same situation above, if both players played exactly 6 races, the sub should be listed on the table.
                            </ul>

                            <ul className='m-4'>
                                6. Players are not allowed to type <b>/c</b> while already participating in a mogi. Players who violate this rule will receive <penalty>-50 MMR and a strike.</penalty>
                            </ul>

                            <ul className='m-4'>
                                7. Course repicks in an FFA will receive a <penalty>-10 score penalty</penalty>.
                            </ul>

                            <ul className='m-4'>
                                8. Course repicks in team events will receive a <penalty>-50 MMR penalty</penalty>.
                            </ul>

                            <ul className='m-4'>
                                9. Courses repicked more than once will incur <penalty>1 strike</penalty> and a <penalty>-100 MMR</penalty> penalty for each repick chosen.
                            </ul>

                            <ul className='m-4'>
                                10. Players who have an incorrect tag for more than 2 races will receive a <penalty>-25 MMR penalty</penalty>.
                            </ul>

                            <ul className='m-4'>
                                11. Teams missing a player for at least 4 races will get ⅔ MMR loss.


                            </ul>

                            <ul className='m-4'>
                                12. Teams missing a player for at least 6 races will get ½ MMR loss.


                            </ul>

                            <ul className='m-4'>
                                13. Teams missing a player for more than 6 races will receive an MMR loss proportionate to the number of races the missing player is absent from. For instance, if a player is missing for 10 races, the team will receive 2/10 loss. The missing player will still lose MMR and will receive an additional <penalty>-100 MMR + strike</penalty> penalty.
                            </ul>

                            <ul className='m-4'>
                                14. If any players happen to be intentionally throwing, teaming, or lap-trolling and there is convincing proof, staff has the right to bestow a <penalty>-100 MMR penalty and a strike</penalty> on the individual in question.
                            </ul>

                            <ul className='m-4'>
                                15. Hosts that start the room with less than 12 players, close the room for no reason, or otherwise cause unnecessary disruptions will receive <penalty>-50 and a strike</penalty>, and may be prohibited from hosting in the future. In a mogi, hosts must take a 30-second clip to prove that it was unintentional (streaming archive is also allowed). Typing !hostban in any channel will show the list of host-banned players.
                            </ul>

                            <ul className='m-4'>
                                16. In order for an event to count, 12 full races must be completed. If 12 races are not completed, the event will not count.
                            </ul>
                            </div>




                            <div className={`${styles.section} text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75`}>
                                DISCONNECTS
                            </div>
                            <div className={`${styles.details} text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75`}>

                            <ul className='m-4'>
                                17. If 3 or more players from at least 2 different teams disconnect, the race will not count and the room must be reopened.​ The affected players must provide video evidence of their disconnects.
                            </ul>

                            <ul className='m-4'>
                                18. If a race does not finish due to lag, the race will not be counted and the room will be reopened.​ The host should provide video evidence of the disconnect.
                            </ul>

                            <ul className='m-4'>
                                19. If item roulette is prominent for most of a race, the race will not count and the room must be reopened.
                            </ul>

                            <ul className='m-4'>
                                20. If no races can be finished for an extended amount of time due to lag, the event can be canceled with no players losing MMR.
                            </ul>

                            <ul className='m-4'>
                                21. If this happens to occur during an event, please attempt to capture video proof of the individual who may be causing the lag in the room. If the proof is convincing, and if the majority of the room agrees on who is causing the lag, staff have the right to punish the individual for a certain amount of time, or warn them to fix their connection before playing again.
                            </ul>

                        </div>
                    </div>






                    <div className='text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75 m-1 border border-solid rounded-lg'>
                        <div className={`${styles.section} text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75`}>
                            VII. RESULTS
                        </div>

                        <div className={`${styles.details} text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75`}>
                            <ul className='m-4'>
                                1. Submit a table using the <b>/table</b> command. Provide a format (1, 2, 3, or 4) and a list of 12 players & 12 scores, alternating. 
                            </ul>
                            <ul className='m-4 ml-10'>
                                A proper command will look something like this: <b>/table 2 Brandon 76 popuko 80+5 Technical 93 Euan 141 Nino 102 mktristan 73 Cynda 87 Vike 70 Francis 92 Joshua 49 Jakearoo 76 AlexYT 40</b>. If there is an issue with your command, our Discord bot should inform you of what is causing the error.
                            </ul>

                            <ul className='m-4'>
                                2. Any penalties that occurred during the match must also be stated by the reporter posting the table.
                            </ul>

                            <ul className='m-4'>
                                3. Room hosts are responsible for taking screenshots of results. If an event fails to have a screenshot or table created within 30 minutes of the last race, the host of the room will receive <penalty>-100 and a strike</penalty>.
                            </ul>

                            <ul className='m-4'>
                                4. Only certain people will be given access to the results channels in order to prevent spam. If you want to become a reporter, look in the <a href="https://discord.gg/uR3rRzsjhk">#self-roles</a> channel in the Discord server
                            </ul>

                        </div>

                    </div>

                    <div className='text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75 m-1 border border-solid rounded-lg'>
                        <div className={`${styles.section} text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75`}>
                            VIII. STRIKE SYSTEM
                        </div>
                        <div className={`${styles.details} text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75`}>
                            <ul className='m-4'>
                                1. Players who receive MMR penalties for quitting matches, lap-trolling, joining the room late, or teaming will receive a strike. Strikes expire after 30 days. Players have a limit of three strikes.
                            </ul>
                            <ul className='m-4'>
                                2. Players who reach the 3 strike limit will be banned from Lounge for 1 week. Each time the strike limit is reached, the ban will increase by an additional week.
                            </ul>
                        </div>
                    </div>















                    <div className='text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75 m-1 border border-solid rounded-lg'>
                    <div className={`${styles.section} text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75`}>
                        IX. SQUAD QUEUE
                    </div>
                    <div className={`${styles.details} text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75`}>
                    <ul className='m-4'>
                            1. Squad Queue is a different way of playing lounge that allows players to play with predetermined teammates.
                        </ul>
                        <ul className='m-4'>
                            2. If a player fails to show up for a match, misses at least half of an event, or trolls during an event (IV. h, IV. j) they will receive <penalty>-100 MMR and a strike</penalty>.
                        </ul>
                        <ul className='m-4'>
                            3. Subs are allowed in Squad Queue events; however, the sub&apos;s MMR must keep their team&apos;s average MMR within the range of the room. In other words, if a team would be in a different room if their team MMR was different, then the sub is not allowed.
                        </ul>
                        <ul className='m-4'>
                            4. If a team gets a sub which would put their average MMR in a different room, the whole team will receive <penalty>-50 and a strike</penalty> at minimum. If the team wins more than 50 MMR, the penalty will be increased to match the amount of MMR they would have gained.
                        </ul>
                        <ul className='m-4'>
                            5. If the host has been decided after opening time, the host has to wait 2 minutes to open the room. Players need to be in the room in 5 minutes. After 10 minutes, the host can start Mogi even if there are not 12 players in the room.
                        </ul>
                    </div>
                    </div>













                    <div className='text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75 m-1 border border-solid rounded-lg'>
                    <div className={`${styles.section} text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75`}>
                        CONCLUSION
                    </div>

                    <div className={`${styles.details} text-zinc-900 dark:text-white bg-neutral-200/75 dark:bg-zinc-800/75`}>
                        That is all that we are expecting each and every one of you to follow. We hope you enjoy your community and lounge experience and follow the rules and guidelines accordingly.
                    </div>
                    </div>
                </div>
            </main>
        </div>
    );
}