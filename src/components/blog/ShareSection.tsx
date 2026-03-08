"use client";

import { Row, Text, Button, useToast } from "@once-ui-system/core";
import { socialSharing } from "@/resources";
import { useI18n } from "@/components/I18nProvider";

interface ShareSectionProps {
  title: string;
  url: string;
}

interface SocialPlatform {
  name: string;
  icon: string;
  label: string;
  generateUrl: (title: string, url: string) => string;
}

const socialPlatforms: Record<string, SocialPlatform> = {
  x: {
    name: "x",
    icon: "twitter",
    label: "X",
    generateUrl: (title, url) => 
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  },
  linkedin: {
    name: "linkedin",
    icon: "linkedin",
    label: "LinkedIn",
    generateUrl: (title, url) => 
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  telegram: {
    name: "telegram",
    icon: "telegram",
    label: "Telegram",
    generateUrl: (title, url) => 
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  email: {
    name: "email",
    icon: "email",
    label: "Email",
    generateUrl: (title, url) => 
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this post: ${url}`)}`,
  },
};

export function ShareSection({ title, url }: ShareSectionProps) {
  const { addToast } = useToast();
  const { content } = useI18n();
  // Don't render if sharing is disabled
  if (!socialSharing.display) {
    return null;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      addToast({
        variant: "success",
        message: content.ui.link_copied,
      });
    } catch (err) {
      console.error('Failed to copy: ', err);
      addToast({
        variant: "danger",
        message: content.ui.copy_failed,
      });
    }
  };

  // Get enabled platforms
  const enabledPlatforms = Object.entries(socialSharing.platforms)
    .filter(([_, enabled]) => enabled && _ !== 'copyLink')
    .map(([platformKey]) => ({ key: platformKey, ...socialPlatforms[platformKey] }))
    .filter(platform => platform.name); // Filter out platforms that don't exist in our definitions

  return (
    <Row fillWidth center gap="16" marginTop="32" marginBottom="16">
      <Text variant="label-default-m" onBackground="neutral-weak">
        {content.ui.share_post}
      </Text>
      <Row data-border="rounded" gap="16" horizontal="center" wrap>
        {enabledPlatforms.map((platform) => (
          <Button key={platform.key} variant="secondary" size="s" href={platform.generateUrl(title, url)} prefixIcon={platform.icon} />
        ))}
        
        {socialSharing.platforms.copyLink && (
          <Button
            variant="secondary"
            size="s"
            onClick={handleCopy}
            prefixIcon="openLink"
          />
        )}
      </Row>
    </Row>
  );
}
