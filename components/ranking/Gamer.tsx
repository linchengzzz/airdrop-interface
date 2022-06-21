import React, { useState } from 'react';
import { useDeveloperTimeRank, useDeveloperTokenRank } from '../../hooks/ranking';
import GamerTimeRankingItem, { GamerTimeRankingHeader } from './GamerTimeRankingItem';
import GamerTokenRankingItem, { GamerTokenRankingHeader } from './GamerTokenRankingItem';

export default function GamerRanking() {
  const [verified] = useState({ total: 0 });
  const [timeRankPage] = useState(1);
  const [tokenRankPage] = useState(1);
  const { data: timeRankData } = useDeveloperTimeRank({ page: timeRankPage, size: 10 });
  const { data: tokenRankData } = useDeveloperTokenRank({ page: tokenRankPage, size: 10 });

  return (
    <div className="px-8 py-12 xs:p-4">
      <div className="flex gap-8 md:flex-col md:gap-2">
        <div>
          <h3 className="text-sm font-medium leading-5">Total Verified Games</h3>
          <div className="ranking__box mt-3 h-[90px] w-[180px] text-center text-[32px] font-medium leading-[90px] xs:w-auto">
            {verified?.total}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium leading-5">Your Ranking</h3>
          <div className="ranking__box mt-3 h-[90px] xs:h-[150px]">
            <div className="flex h-full w-full  gap-2 py-2 px-4 xs:flex-wrap xs:gap-0 xs:px-2">
              <div className="flex h-[72px] flex-1 items-center justify-center truncate xs:basis-full">
                <div className="mr-3 h-[52px] w-[52px] flex-none overflow-hidden rounded bg-[#CEDCFF]/10">
                  <img
                    src="https://avatars.cloudflare.steamstatic.com/6cfc2cdffb409479bc9551e5044b06a8c4260aa8_full.jpg"
                    alt="avatar"
                  />
                </div>
                <div className="truncate">Sign in please</div>
              </div>
              <div className="my-2 w-[1px] bg-[#949FA9] xs:hidden" />
              <div className="flex flex-1 cursor-pointer items-center justify-center rounded-2xl text-sm hover:bg-[#7980AF]/30">
                Token Ranking <span className="pl-3 font-['D-DIN'] text-2xl font-bold">--</span>
              </div>
              <div className="my-2 w-[1px] bg-[#949FA9] xs:hidden" />
              <div className="flex flex-1 cursor-pointer items-center justify-center rounded-2xl text-sm hover:bg-[#7980AF]/30">
                Token Ranking <span className="pl-3 font-['D-DIN'] text-2xl font-bold">--</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 flex gap-8 md:flex-col">
        <div className="w-full">
          <h2 className="border-b border-p12-line pb-3 text-center text-xl font-medium">Latest Verify List</h2>
          <GamerTimeRankingHeader />
          <div className="flex flex-col gap-4">
            {timeRankData?.rankList.map((item, index) => (
              <GamerTimeRankingItem key={item.appid || index} />
            ))}
          </div>
        </div>
        <div className="w-full">
          <h2 className="border-b border-p12-line pb-3 text-center text-xl font-medium">Token RankList</h2>
          <GamerTokenRankingHeader />
          <div className="flex flex-col gap-4">
            {tokenRankData?.rankList.map((item, index) => (
              <GamerTokenRankingItem key={item.appid || index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
