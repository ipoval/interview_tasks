#!/usr/bin/env ruby

puts 'ENTER GAME TEXT:'

# TEXT = STDIN.readline
TEXT = 'Our favorite language is ((gem:a gemstone)). We think ((gem)) is better than ((a gemstone)).'

input_words = []
links = {} # will point to the index in the input_words

# 1st step - find all links and words
TEXT.scan(/\(\((.+?)\)\)/).flatten.each do |placeholder|
  place = placeholder.tr '()', ''
  link = nil

  if place.include? ':'
    link, word = place.split(':')
  else
    word = place
  end

  next if links.keys.include? word

  print "PLEASE SAY WORD FOR #{word}: "
  input_words.push([place, STDIN.readline.chomp])

  if link
    links[link] = input_words.length - 1
  end
end

input_words.each do |place|
  replace_this = '((' + place[0] + '))'
  replace_to = place[1]

  pattern = Regexp.new Regexp.escape(replace_this)
  TEXT.sub!(pattern, replace_to)
end

links.each do |link, index|
  replace_this = '((' + link + '))'
  replace_to = input_words[index][1]

  TEXT.sub!(replace_this, replace_to)
end


p TEXT


__END__

Our favorite language is ((gem:a gemstone)). We think ((gem)) is better than ((a gemstone)).
