import React, { useMemo } from 'react';
import Image from 'next/image';
import Tag from '../tag';
import { useQuery } from 'react-query';
import { fetchDeveloperInfo } from '../../lib/api';
import { useWeb3React } from '@web3-react/core';
import { useRecoilState, useRecoilValue } from 'recoil';
import { motion } from 'framer-motion';
import { claimGroupSelector, claimingGameAtom, developerGameAtom, NFTClaim } from '../../store/developer/state';
import { BADGES } from '../../constants';

function DeveloperStatus() {
  const { account } = useWeb3React();
  const [games, setGames] = useRecoilState(developerGameAtom);
  const claimGroup = useRecoilValue(claimGroupSelector);
  const [claimingGame, setClaimingGame] = useRecoilState(claimingGameAtom);
  useQuery(['developer_info', account], () => fetchDeveloperInfo({ addr: account }), {
    enabled: !!account,
    // refetchInterval: 30000,
    onSuccess: (data) => {
      if (data.code !== 0) return;
      if (claimingGame) {
        const currentGame = games.find((game) => game.appid === claimingGame.appid);
        currentGame?.nft_claim !== NFTClaim.CLAIMED && window.open(BADGES[claimingGame.nft_level].claim);
        setClaimingGame(undefined);
      }
      setGames(data.data.account_info || []);
    },
  });

  const tagType = useMemo(
    () => (claimGroup[NFTClaim.CLAIMED].length === games.length ? 'success' : 'error'),
    [claimGroup, games.length],
  );

  return (
    <motion.div
      initial={{ opacity: 0.65, width: 0 }}
      animate={{ opacity: 1, width: 'auto' }}
      exit={{ opacity: 0, width: 0 }}
      className="flex overflow-hidden"
    >
      <div className="flex items-center justify-center gap-3 border-r border-p12-line px-3 text-xl">
        {games.length ? (
          <Tag type={tagType} value={`${claimGroup[NFTClaim.CLAIMED].length}/${games.length} Airdrop NFT`} />
        ) : (
          <Tag type="error" value="Not Eligible" />
        )}
      </div>
      <div className="flex items-center justify-center gap-2 border-r border-p12-line px-3 font-['D-DIN'] text-xl">
        <span className="text-p12-success">{games.length}</span>Games
      </div>
      <div className="flex items-center justify-center gap-3 border-r border-p12-line px-3 text-xl">
        <p className="font-['D-DIN'] font-bold">?,???</p>
        <div className="h-[30px] w-[30px]">
          <Image width={30} height={30} src="/img/p12.png" alt="p12" />
        </div>
      </div>
    </motion.div>
  );
}

export default React.memo(DeveloperStatus);
