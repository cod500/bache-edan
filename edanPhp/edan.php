<?php

/**
 * EDANInterface
 *
 * @version 0.10.1 - Updated signing, added X-AppVersion, deprecated unused members:
 *   metadataQuery(), tagQuery(), listQuery(), isValid(), $results,
 */

class EDANInterface {
  // The EDAN server.
  private $server;

  // The EDAN Application ID.
  private $app_id;

  // The EDAN Application ID's secret key.
  private $edan_key;

  /**
   * The EDAN authentication type.
   *
   * 0 for unsigned/trusted/T1 requests;
   * 1 for signed/T2 requests;
   * 2 for password based (unused)
   */
  private $auth_type = 1;

  // Whether the request was successful based on 200 response header.
  private $valid_request = FALSE;

  public function __construct($server, $app_id, $edan_key, $auth_type = 1) {
    $this->server = $server;
    $this->app_id = $app_id;
    $this->edan_key = $edan_key;

    // Normalize, but don't cast
    if ($auth_type == 0 || $auth_type == '0') {
      $this->auth_type = 0;
    }
  }

  /**
   * Creates the header for the request to EDAN.
   *
   * Takes $uri, prepends a nonce, and appends the date and appID key. Hashes as sha1() and base64_encode() the result.
   *
   * @param string $uri The URI to be hashed and encoded.
   * @return array The elements and signed header value.
   */
  private function encodeHeader($uri) {
    $ipnonce = $this->get_nonce(); // Alternatively you could do: get_nonce(8, '-'.get_nonce(8));
    $date = date('Y-m-d H:i:s');

    $return = array(
      'X-AppId: ' . $this->app_id,
      'X-RequestDate: ' . $date,
      'X-AppVersion: ' . 'EDANInterface-0.10.1'
    );

    // For signed/T2 requests
    if ($this->auth_type === 1) {
      $auth = "{$ipnonce}\n{$uri}\n{$date}\n{$this->edan_key}";
      $content = base64_encode(sha1($auth));
      $return[] = 'X-Nonce: ' . $ipnonce;
      $return[] = 'X-AuthContent: ' . $content;
    }

    return $return;
  }

  /**
   * Perform an EDAN request.
   *
   * @param string $uri The URL-encoded query string.
   * @param string $service The EDAN service name.
   * @param boolean $POST If the request is a POST.
   * @param array $info The output of curl_getinfo().
   *
   * @return string The EDAN response.
   */
  public function sendRequest($uri, $service, $POST = FALSE, &$info = null) {
    $ch = curl_init();

    if ($POST === TRUE) {
      curl_setopt($ch, CURLOPT_URL, $this->server . $service);
      curl_setopt($ch, CURLOPT_POST, 1);
      //curl_setopt($ch, CURLOPT_POSTFIELDS, $uri);
      curl_setopt($ch, CURLOPT_POSTFIELDS, "encodedRequest=" . base64_encode($uri));
    } else {
      curl_setopt($ch, CURLOPT_URL, $this->server . $service . (!empty($uri) ? '?' . $uri : ''));
    }

    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $this->encodeHeader($uri));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLINFO_HEADER_OUT, 1);

    $response = curl_exec($ch);
    if ($response !== false) {
      $info = curl_getinfo($ch);

      if ($info['http_code'] == 200) {
        $this->valid_request = TRUE;
      } else {
        $this->valid_request = FALSE;
      }
    }
    else {
      $info = curl_error($ch);
      $this->valid_request = FALSE;
    }

    curl_close($ch);

    return $response;
  }

  /**
   * Generates a nonce.
   *
   * @param int $length
   *   (optional) Int representing the length of the random string.
   * @param string $prefix
   *   (optional) String containing a prefix to be prepended to the random string.
   *
   * @return string
   *   Returns a string containing a randomized set of letters and numbers $length long
   *   with $prefix prepended.
   */
  private function get_nonce($length = 15, $prefix = '') {
    $password = "";
    $possible = "0123456789abcdefghijklmnopqrstuvwxyz";

    $i = 0;

    while ($i < $length) {
      $char = substr($possible, mt_rand(0, strlen($possible)-1), 1);

      if (!strstr($password, $char)) {
        $password .= $char;
        $i++;
      }
    }

    return $prefix.$password;
  }
}
